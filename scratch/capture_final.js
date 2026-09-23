import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProcess = spawn(chromePath, [
  '--headless',
  '--remote-debugging-port=9226',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1400,900',
  'http://localhost:5174/#programs'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9226/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('localhost:5174')) || tabs[0];
    if (!tab) return;

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((resolve) => {
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        resolve();
      });
    });

    console.log('Waiting 5s for page to settle at #programs...');
    await new Promise(r => setTimeout(r, 5000));

    // Scroll directly to #programs just to be 100% sure
    let msgId = 10;
    const scrollPromise = new Promise((resolve) => {
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
            const p = document.getElementById('programs');
            if (p) p.scrollIntoView({ behavior: 'instant', block: 'start' });
            ({
              programsHeader: document.querySelector('#programs .store-main-title')?.textContent,
              old3dSectionExists: !!document.querySelector('.ui-programs')
            });
          `,
          returnByValue: true
        }
      }));
    });
    const scrollRes = await scrollPromise;
    console.log('Scroll & section verification:', scrollRes?.result?.value);

    await new Promise(r => setTimeout(r, 1000));

    // Screenshot 1: #programs section
    msgId = 11;
    const s1Promise = new Promise((resolve) => {
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
    const s1Data = await s1Promise;
    fs.writeFileSync('C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\2304f454-e9b5-4b86-84b2-e4863216034f\\new_programs_section.png', Buffer.from(s1Data, 'base64'));
    console.log('Saved new_programs_section.png');

    // Click "Course Plan"
    msgId = 12;
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
          `,
          returnByValue: true
        }
      }));
    });
    const clickRes = await clickPromise;
    console.log('Clicked Course Plan:', clickRes?.result?.value);

    await new Promise(r => setTimeout(r, 1000));

    // Screenshot 2: Opened Course Plan Modal
    msgId = 13;
    const s2Promise = new Promise((resolve) => {
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
    const s2Data = await s2Promise;
    fs.writeFileSync('C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\2304f454-e9b5-4b86-84b2-e4863216034f\\course_plan_opened.png', Buffer.from(s2Data, 'base64'));
    console.log('Saved course_plan_opened.png');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    chromeProcess.kill();
    process.exit(0);
  }
}

run();
