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

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const tabs = await getJson('http://127.0.0.1:9226/json/list');
    const targetTab = tabs.find((t) => t.type === 'page') || tabs[0];

    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r));

    await send(ws, 'Page.enable');
    await send(ws, 'DOM.enable');

    console.log('Connected to CDP on port 9226');

    // Section audit across viewports
    const viewports = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 800 }
    ];

    const auditResults = {};

    for (const vp of viewports) {
      await send(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768
      });

      await new Promise((r) => setTimeout(r, 800));

      const res = await send(ws, 'Runtime.evaluate', {
        expression: `(() => {
          const sections = [
            { name: '1. Navbar', el: document.querySelector('header') },
            { name: '2. Hero', el: document.getElementById('hero') || document.querySelector('main > section:first-child') },
            { name: '3. Section Tabs', el: document.querySelector('section.container-gutter.py-8') },
            { name: '4. History', el: document.getElementById('history') },
            { name: '5. Gallery', el: document.getElementById('gallery') },
            { name: '6. Membership', el: document.getElementById('membership') },
            { name: '7. Officers', el: document.getElementById('officers') },
            { name: '8. Accomplishments', el: document.getElementById('accomplishments') },
            { name: '9. Merch', el: document.getElementById('merch') },
            { name: '10. DL Application', el: document.getElementById('dl-application') },
            { name: '11. GWA Calculator', el: document.getElementById('gwa-calculator') },
            { name: '12. Hall of Fame', el: document.getElementById('hall-of-fame') },
            { name: '13. Footer', el: document.querySelector('footer') }
          ];

          const sectionAudit = sections.map(s => {
            if (!s.el) return { name: s.name, found: false, overflow: false };
            const rect = s.el.getBoundingClientRect();
            const overflow = s.el.scrollWidth > window.innerWidth;
            return {
              name: s.name,
              found: true,
              scrollWidth: s.el.scrollWidth,
              innerWidth: window.innerWidth,
              hasOverflow: overflow
            };
          });

          return {
            pageScrollWidth: document.documentElement.scrollWidth,
            pageInnerWidth: window.innerWidth,
            pageOverflow: document.documentElement.scrollWidth > window.innerWidth,
            totalSectionsCount: sections.length,
            allFound: sectionAudit.every(s => s.found),
            anyOverflow: sectionAudit.some(s => s.hasOverflow),
            sections: sectionAudit
          };
        })()`,
        returnByValue: true
      });

      auditResults[vp.name] = res.result.value;
      console.log(`\n=== Viewport ${vp.name} (${vp.width}px) Audit ===`);
      console.log(`Page hasOverflow: ${res.result.value.pageOverflow}`);
      console.log(`All 13 sections found: ${res.result.value.allFound}`);
      console.log(`Any section overflow: ${res.result.value.anyOverflow}`);

      const screenshot = await send(ws, 'Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, `screenshot_m5_${vp.width}.png`), Buffer.from(screenshot.data, 'base64'));
    }

    // Now Desktop test for Hall of Fame interactions
    await send(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // Scroll to Hall of Fame
    await send(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('hall-of-fame').scrollIntoView();`
    });
    await new Promise((r) => setTimeout(r, 600));

    // Capture initial Hall of Fame section screenshot
    const hofInitialShot = await send(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'screenshot_m5_hof_desktop.png'), Buffer.from(hofInitialShot.data, 'base64'));
    console.log('Saved screenshot_m5_hof_desktop.png');

    // Test 1: Initial state card count and provisional labels
    const initialState = await send(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('[data-hof-card]'));
        const visible = cards.filter(c => c.style.display !== 'none');
        const emptyState = document.querySelector('[data-hof-empty]');
        const banner = document.querySelector('[data-testid="hof-provisional-banner"]');

        const names = visible.map(c => c.querySelector('h3').innerText);
        const ranks = Array.from(document.querySelectorAll('.rank-tag, [data-hof-card] span')).map(s => s.innerText).filter(t => t.includes('Provisional Rank'));

        return {
          totalCards: cards.length,
          visibleCount: visible.length,
          emptyVisible: emptyState ? emptyState.style.display !== 'none' && !emptyState.classList.contains('hidden') : false,
          bannerText: banner ? banner.innerText : null,
          provisionalNamesFound: names.every(n => n.includes('[Pending')),
          ranksCount: ranks.length,
          ranksSample: ranks
        };
      })()`,
      returnByValue: true
    });
    console.log('\nHall of Fame Initial State:', initialState.result.value);

    // Test 2: Filter by Topnotcher
    await send(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('[data-cat-btn="topnotcher"]').click();`
    });
    await new Promise((r) => setTimeout(r, 400));

    const topnotcherState = await send(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('[data-hof-card]'));
        const visible = cards.filter(c => c.style.display !== 'none');
        const activeBtn = document.querySelector('[data-cat-btn="topnotcher"]').getAttribute('aria-pressed');
        const ranks = visible.map(c => {
          const rankEl = Array.from(c.querySelectorAll('span')).find(s => s.innerText.includes('Provisional Rank'));
          return rankEl ? rankEl.innerText : null;
        });
        return {
          visibleCount: visible.length,
          activeBtnAriaPressed: activeBtn,
          ranks: ranks
        };
      })()`,
      returnByValue: true
    });
    console.log('Topnotcher Filter State:', topnotcherState.result.value);

    const hofTopShot = await send(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'screenshot_m5_hof_filtered_topnotcher.png'), Buffer.from(hofTopShot.data, 'base64'));

    // Test 3: Filter by Year 2023 while Topnotcher is active
    await send(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('[data-yr-btn="2023"]').click();`
    });
    await new Promise((r) => setTimeout(r, 400));

    const yr2023State = await send(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('[data-hof-card]'));
        const visible = cards.filter(c => c.style.display !== 'none');
        return {
          visibleCount: visible.length,
          cardName: visible[0] ? visible[0].querySelector('h3').innerText : null,
          cardYear: visible[0] ? visible[0].getAttribute('data-year') : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Topnotcher + 2023 Filter State:', yr2023State.result.value);

    // Test 4: Switch to Dean's Lister while 2023 is active -> Zero matches -> Empty state!
    await send(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('[data-cat-btn="deans-lister"]').click();`
    });
    await new Promise((r) => setTimeout(r, 400));

    const emptyFilterState = await send(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('[data-hof-card]'));
        const visible = cards.filter(c => c.style.display !== 'none');
        const emptyState = document.querySelector('[data-hof-empty]');
        return {
          visibleCount: visible.length,
          emptyVisible: emptyState ? emptyState.style.display !== 'none' && !emptyState.classList.contains('hidden') : false,
          emptyText: emptyState ? emptyState.innerText : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Dean\'s Lister + 2023 (Empty) Filter State:', emptyFilterState.result.value);

    const hofEmptyShot = await send(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'screenshot_m5_hof_empty_state.png'), Buffer.from(hofEmptyShot.data, 'base64'));

    // Reset filters
    await send(ws, 'Runtime.evaluate', {
      expression: `
        document.querySelector('[data-cat-btn="all"]').click();
        document.querySelector('[data-yr-btn="all"]').click();
      `
    });
    await new Promise((r) => setTimeout(r, 400));

    console.log('\nCDP Browser Test Suite Finished Successfully!');
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('CDP test error:', err);
  process.exit(1);
});
