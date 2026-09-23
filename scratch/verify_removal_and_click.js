import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProcess = spawn(chromePath, [
  '--headless',
  '--remote-debugging-port=9224',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1400,900',
  'http://localhost:5174/#programs'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9224/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('localhost:5174')) || tabs[0];
    if (!tab) {
      console.log('No tab found for 5174!');
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

    console.log('Waiting 5s for page to settle at #programs...');
    await new Promise(r => setTimeout(r, 5000));

    // Verify sections on page
    let msgId = 10;
    const evalSections = new Promise((resolve) => {
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
            ({
              programsUniverseExists: !!document.querySelector('.ui-programs'),
              courseStoreExists: !!document.querySelector('.course-store-section'),
              programsIdOnCourseStore: document.getElementById('programs')?.className,
              buttonsCount: document.querySelectorAll('.syllabus-secondary-btn').length
            })
          `,
          returnByValue: true
        }
      }));
    });
    const sectionsResult = await evalSections;
    console.log('Sections check result:', sectionsResult.value);

    // Click "Course Plan" button
    msgId = 11;
    const clickPlan = new Promise((resolve) => {
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
    const clickRes = await clickPlan;
    console.log('Clicked Course Plan button:', clickRes.value);

    await new Promise(r => setTimeout(r, 1000));

    // Check if modal is visible in document.body
    msgId = 12;
    const checkModal = new Promise((resolve) => {
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
            ({
              modalBackdropExists: !!document.querySelector('.course-modal-backdrop'),
              modalWindowExists: !!document.querySelector('.course-modal-window'),
              modalTitle: document.querySelector('.modal-hero-header h2')?.textContent,
              currentHash: window.location.hash
            })
          `,
          returnByValue: true
        }
      }));
    });
    const modalRes = await checkModal;
    console.log('Modal status in DOM:', modalRes.value);

    // Capture screenshot of opened modal
    msgId = 13;
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
    const outPath = 'C:\\Users\\kavya\\.gemini\\antigravity-ide\\brain\\2304f454-e9b5-4b86-84b2-e4863216034f\\course_plan_clicked_verified.png';
    fs.writeFileSync(outPath, buffer);
    console.log('Course plan modal screenshot saved successfully to:', outPath);

  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chromeProcess.kill();
    process.exit(0);
  }
}

run();
