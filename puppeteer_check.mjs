import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' }).catch(e => console.log('Goto error:', e));
  
  const content = await page.evaluate(() => document.body.innerHTML);
  fs.writeFileSync('page_dump.html', content);
  console.log('Saved to page_dump.html');

  await browser.close();
})();
