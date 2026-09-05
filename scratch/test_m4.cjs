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
      '--remote-debugging-port=9225',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--force-device-scale-factor=1',
      'http://127.0.0.1:4321/'
    ]
  );

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const tabs = await getJson('http://127.0.0.1:9225/json/list');
    const targetTab = tabs.find((t) => t.type === 'page') || tabs[0];

    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r));

    await send(ws, 'Page.enable');
    await send(ws, 'DOM.enable');

    console.log('Connected to CDP on port 9225');

    const viewports = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 800 }
    ];

    for (const vp of viewports) {
      await send(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768
      });

      await new Promise((r) => setTimeout(r, 600));

      const overflowRes = await send(ws, 'Runtime.evaluate', {
        expression: `({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
          merchPresent: !!document.getElementById('merch'),
          dlPresent: !!document.getElementById('dl-application'),
          gwaPresent: !!document.getElementById('gwa-calculator'),
          thresholdTbdText: !!document.body.innerText.includes("Threshold TBD — official criteria pending confirmation from the Dean's office.")
        })`,
        returnByValue: true
      });

      console.log(`Viewport ${vp.name} (${vp.width}px):`, overflowRes.result.value);

      // Capture screenshot at 375px for verification
      if (vp.width === 375) {
        const screenshot = await send(ws, 'Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'screenshot_m4_375.png'), Buffer.from(screenshot.data, 'base64'));
        console.log('Saved screenshot_m4_375.png');
      }
    }

    // Scroll to GWA calculator and capture desktop screenshot
    await send(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('gwa-calculator')?.scrollIntoView({ block: 'center' })`
    });
    await new Promise((r) => setTimeout(r, 800));

    const gwaScreenshot = await send(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'screenshot_gwa_1280.png'), Buffer.from(gwaScreenshot.data, 'base64'));
    console.log('Saved screenshot_gwa_1280.png');

    // Scroll to Merch and capture screenshot
    await send(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('merch')?.scrollIntoView({ block: 'center' })`
    });
    await new Promise((r) => setTimeout(r, 800));

    const merchScreenshot = await send(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'screenshot_merch_1280.png'), Buffer.from(merchScreenshot.data, 'base64'));
    console.log('Saved screenshot_merch_1280.png');

    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
