import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProcess = spawn(chromePath, [
  '--headless',
  '--remote-debugging-port=9227',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1440,820',
  'http://localhost:5174/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2500));
  try {
    const listRes = await fetch('http://127.0.0.1:9227/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('localhost:5174')) || tabs[0];
    if (!tab) {
      console.error('No tab found');
      chromeProcess.kill();
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

    console.log('Waiting 5s for loading screen and Hero to settle...');
    await new Promise(r => setTimeout(r, 5000));

    // Helper to evaluate JS
    const evaluate = async (id, expression) => {
      return new Promise((resolve) => {
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression } }));
      });
    };

    // Helper to screenshot
    const screenshot = async (id, filename) => {
      const data = await new Promise((resolve) => {
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === id && msg.result && msg.result.data) {
            ws.removeEventListener('message', handler);
            resolve(msg.result.data);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method: 'Page.captureScreenshot', params: { format: 'png' } }));
      });
      fs.writeFileSync(`C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\2304f454-e9b5-4b86-84b2-e4863216034f\\${filename}`, Buffer.from(data, 'base64'));
      console.log(`Saved ${filename}`);
    };

    // 1. Capture Hero
    await screenshot(10, 'educational_hero.png');

    // 2. Scroll to Course Store
    await evaluate(11, `
      const card = document.querySelector('.quantum-course-card') || document.getElementById('programs');
      if (card) card.scrollIntoView({ behavior: 'instant', block: 'center' });
    `);
    await new Promise(r => setTimeout(r, 1500));
    await screenshot(12, 'educational_courses.png');

    // 3. Scroll to Why Us
    await evaluate(13, `
      const whyUs = document.getElementById('why-us') || document.querySelector('.ui-why-us');
      if (whyUs) whyUs.scrollIntoView({ behavior: 'instant', block: 'start' });
    `);
    await new Promise(r => setTimeout(r, 1500));
    await screenshot(14, 'educational_whyus.png');

    // 4. Scroll to Career Path
    await evaluate(15, `
      const career = document.getElementById('career') || document.querySelector('.ui-career-path');
      if (career) career.scrollIntoView({ behavior: 'instant', block: 'start' });
    `);
    await new Promise(r => setTimeout(r, 1500));
    await screenshot(16, 'educational_career.png');

    // 5. Open Modal on course card
    await evaluate(17, `
      const card = document.getElementById('programs') || document.querySelector('.course-store-section');
      if (card) card.scrollIntoView({ behavior: 'instant', block: 'center' });
    `);
    await new Promise(r => setTimeout(r, 1000));
    await evaluate(18, `
      const btn = document.querySelector('.syllabus-secondary-btn');
      if (btn) btn.click();
    `);
    await new Promise(r => setTimeout(r, 1500));
    await screenshot(19, 'educational_modal.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chromeProcess.kill();
  }
}

run();
