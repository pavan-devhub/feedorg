import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' }).catch(e => console.log('Goto error:', e));
  
  await new Promise(r => setTimeout(r, 3000));
  
  await page.screenshot({ path: 'screenshot.png' });
  
  console.log('Screenshot saved to screenshot.png');
  await browser.close();
})();
