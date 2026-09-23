import { spawn } from 'child_process';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless', '--remote-debugging-port=9229', '--disable-gpu', '--no-sandbox', 'http://localhost:5174/'
]);

setTimeout(async () => {
  try {
    const list = await (await fetch('http://127.0.0.1:9229/json/list')).json();
    const tab = list.find(t => t.url.includes('localhost:5174')) || list[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 2,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              JSON.stringify(
                Array.from(document.querySelectorAll('.ui-hero, .ui-hero *'))
                  .map(el => ({ tag: el.tagName, cls: typeof el.className === 'string' ? el.className : '', bg: window.getComputedStyle(el).backgroundColor, rect: el.getBoundingClientRect() }))
                  .filter(x => x.rect.top > 300 && x.rect.left > 700)
              )
            `
          }
        }));
      }, 4000);
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.id === 2) {
        console.log('DOM elements:', data.result.result.value);
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error(err);
    chrome.kill();
  }
}, 2000);
