import { spawn } from 'child_process'
import http from 'http'
import fs from 'fs'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chrome = spawn(chromePath, [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank'
])

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(JSON.parse(data)))
    }).on('error', reject)
  })
}

async function run() {
  await wait(1500)
  try {
    const targets = await getJson('http://127.0.0.1:9222/json')
    const pageTarget = targets.find(t => t.type === 'page') || targets[0]
    const wsUrl = pageTarget.webSocketDebuggerUrl

    const ws = new WebSocket(wsUrl)
    let id = 1
    const callbacks = new Map()

    ws.addEventListener('message', event => {
      const msg = JSON.parse(event.data)
      if (callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg)
        callbacks.delete(msg.id)
      }
    })

    function send(method, params = {}) {
      return new Promise(resolve => {
        const msgId = id++
        callbacks.set(msgId, resolve)
        ws.send(JSON.stringify({ id: msgId, method, params }))
      })
    }

    if (ws.readyState !== WebSocket.OPEN) {
      await new Promise(r => ws.addEventListener('open', r))
    }

    await send('Page.enable')
    await send('Runtime.enable')

    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    })

    await send('Page.navigate', { url: 'http://localhost:5174/?no-loader' })
    await wait(2000)

    const sections = ['about', 'why-us', 'programs', 'testimonials', 'contact']
    for (const sec of sections) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const el = document.querySelector('#' + '${sec}');
          if (el) window.scrollTo(0, el.offsetTop);
        })()`
      })
      await wait(600)
      const shot = await send('Page.captureScreenshot', { format: 'png' })
      fs.writeFileSync(`C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\74813e59-c155-47bc-b837-d613c72b5083\\mobile_${sec}.png`, Buffer.from(shot.result.data, 'base64'))
      console.log(`Saved mobile_${sec}.png`)
    }

    ws.close()
  } catch (err) {
    console.error('Error:', err)
  } finally {
    chrome.kill()
  }
}

run()
