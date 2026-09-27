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

    // Set mobile device viewport: 390 x 844 (iPhone 14 / standard modern smartphone)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    })

    await send('Page.navigate', { url: 'http://localhost:5174/?no-loader' })
    await wait(2500)

    // 1. Hero on mobile
    let shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\74813e59-c155-47bc-b837-d613c72b5083\\mobile_hero.png', Buffer.from(shot.result.data, 'base64'))
    console.log('Saved mobile_hero.png')

    // 2. Why Us on mobile
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('#why-us');
        if (el) window.scrollTo(0, el.offsetTop);
      })()`
    })
    await wait(600)
    shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\74813e59-c155-47bc-b837-d613c72b5083\\mobile_why_us.png', Buffer.from(shot.result.data, 'base64'))
    console.log('Saved mobile_why_us.png')

    // 3. Why Us scrolled slightly down (to see circle & cards)
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('#why-us');
        if (el) window.scrollTo(0, el.offsetTop + 260);
      })()`
    })
    await wait(600)
    shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\74813e59-c155-47bc-b837-d613c72b5083\\mobile_why_us_cards.png', Buffer.from(shot.result.data, 'base64'))
    console.log('Saved mobile_why_us_cards.png')

    // 4. Course Details Modal on mobile
    await send('Page.navigate', { url: 'http://localhost:5174/?no-loader#course-artificial-intelligence' })
    await wait(1500)
    shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\74813e59-c155-47bc-b837-d613c72b5083\\mobile_course_modal.png', Buffer.from(shot.result.data, 'base64'))
    console.log('Saved mobile_course_modal.png')

    ws.close()
  } catch (err) {
    console.error('Error:', err)
  } finally {
    chrome.kill()
  }
}

run()
