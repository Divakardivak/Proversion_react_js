import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProcess = spawn(chromePath, [
  '--headless',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1400,900',
  'http://localhost:5173/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('localhost:5173')) || tabs[0];
    if (!tab) {
      console.log('No tab found!');
      return;
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        resolve();
      });
    });

    console.log('Waiting 5.5s for loading screen to complete and Hero to reveal...');
    await new Promise(r => setTimeout(r, 5500));

    // Send captureScreenshot command
    let msgId = 10;
    const screenshotPromise = new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId && msg.result && msg.result.data) {
          ws.removeEventListener('message', handler);
          resolve(msg.result.data);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method: 'Page.captureScreenshot', params: { format: 'png' } }));
    });

    const base64Data = await screenshotPromise;
    const buffer = Buffer.from(base64Data, 'base64');
    const outPath = 'C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\2304f454-e9b5-4b86-84b2-e4863216034f\\page_verified.png';
    fs.writeFileSync(outPath, buffer);
    console.log('Screenshot saved successfully to:', outPath);

    // Now let's scroll to #course-store and take another screenshot
    msgId = 11;
    const evalPromise = new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({
        id: msgId,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            const el = document.getElementById('course-store');
            if (el) { el.scrollIntoView({ behavior: 'instant', block: 'start' }); true; } else { false; }
          `
        }
      }));
    });
    await evalPromise;
    await new Promise(r => setTimeout(r, 1000));

    msgId = 12;
    const screenshot2Promise = new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId && msg.result && msg.result.data) {
          ws.removeEventListener('message', handler);
          resolve(msg.result.data);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method: 'Page.captureScreenshot', params: { format: 'png' } }));
    });
    const base64Data2 = await screenshot2Promise;
    const buffer2 = Buffer.from(base64Data2, 'base64');
    const outPath2 = 'C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\2304f454-e9b5-4b86-84b2-e4863216034f\\course_store_verified.png';
    fs.writeFileSync(outPath2, buffer2);
    console.log('Course store screenshot saved to:', outPath2);

    // Now open modal by clicking the syllabus button
    msgId = 13;
    const clickPromise = new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({
        id: msgId,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            const btn = document.querySelector('.syllabus-secondary-btn');
            if (btn) { btn.click(); true; } else { false; }
          `
        }
      }));
    });
    await clickPromise;
    await new Promise(r => setTimeout(r, 1000));

    msgId = 14;
    const screenshot3Promise = new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId && msg.result && msg.result.data) {
          ws.removeEventListener('message', handler);
          resolve(msg.result.data);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method: 'Page.captureScreenshot', params: { format: 'png' } }));
    });
    const base64Data3 = await screenshot3Promise;
    const buffer3 = Buffer.from(base64Data3, 'base64');
    const outPath3 = 'C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\2304f454-e9b5-4b86-84b2-e4863216034f\\modal_verified.png';
    fs.writeFileSync(outPath3, buffer3);
    console.log('Modal screenshot saved to:', outPath3);

  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chromeProcess.kill();
    process.exit(0);
  }
}

run();
