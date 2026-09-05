const cp = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\06b5f713-4336-4ee8-a9ad-5bd11e733b99';

function send(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const chrome = cp.spawn(
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    [
      '--headless=new',
      '--remote-debugging-port=9226',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--force-device-scale-factor=1',
      'http://127.0.0.1:4321/'
    ]
  );

  await new Promise((r) => setTimeout(r, 1500));

  try {
    const tabs = await getJson('http://127.0.0.1:9226/json/list');
    const targetTab = tabs.find((t) => t.type === 'page') || tabs[0];
    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await send(ws, 'Page.enable');
    await send(ws, 'DOM.enable');
    await send(ws, 'Runtime.enable');
    await new Promise((r) => setTimeout(r, 1000));

    const viewports = [
      { name: 'desktop_1280', width: 1280, height: 800, mobile: false },
      { name: 'tablet_768', width: 768, height: 1024, mobile: false },
      { name: 'mobile_375', width: 375, height: 812, mobile: true },
    ];

    for (const vp of viewports) {
      await send(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });
      await new Promise((r) => setTimeout(r, 600));

      // 1. Capture full hero section
      const heroMetrics = await send(ws, 'Runtime.evaluate', {
        expression: `(() => {
          const hero = document.getElementById('hero');
          const rect = hero.getBoundingClientRect();
          const crest = hero.querySelector('img');
          const crestRect = crest ? crest.getBoundingClientRect() : null;
          const h1 = hero.querySelector('h1');
          const h1Rect = h1 ? h1.getBoundingClientRect() : null;
          const p = hero.querySelector('p');
          const pRect = p ? p.getBoundingClientRect() : null;
          const btn = hero.querySelector('a');
          const btnRect = btn ? btn.getBoundingClientRect() : null;

          return {
            heroHeight: rect.height,
            crestBox: crestRect ? { width: crestRect.width, height: crestRect.height, top: crestRect.top } : null,
            h1Box: h1Rect ? { width: h1Rect.width, height: h1Rect.height, top: h1Rect.top } : null,
            crestToH1Gap: (h1Rect && crestRect) ? (h1Rect.top - crestRect.bottom) : null,
            h1ToPGap: (pRect && h1Rect) ? (pRect.top - h1Rect.bottom) : null,
            pToBtnGap: (btnRect && pRect) ? (btnRect.top - pRect.bottom) : null,
            hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
          };
        })()`,
        returnByValue: true
      });

      console.log(`\nMetrics for ${vp.name}:`, heroMetrics.result.value);

      // Full viewport screenshot
      const snap = await send(ws, 'Page.captureScreenshot', { format: 'png' });
      const snapPath = path.join(ARTIFACT_DIR, `hero_after_${vp.name}.png`);
      fs.writeFileSync(snapPath, Buffer.from(snap.data, 'base64'));
      console.log(`Saved screenshot: ${snapPath}`);
    }

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
