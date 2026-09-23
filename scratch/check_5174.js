import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProcess = spawn(chromePath, [
  '--headless',
  '--remote-debugging-port=9223',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:5174/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9223/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('localhost:5174')) || tabs[0];
    if (!tab) {
      console.log('No tab found for 5174!');
      return;
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
    });

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[CONSOLE 5174]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      } else if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[EXCEPTION 5174]', JSON.stringify(msg.params.exceptionDetails, null, 2));
      }
    });

    await new Promise(r => setTimeout(r, 4000));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chromeProcess.kill();
    process.exit(0);
  }
}

run();
