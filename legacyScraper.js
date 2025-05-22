import { chromium } from 'playwright';
import fs from 'fs';

export async function scrapeLegacy() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.legacy.com/us/obituaries');

  const results = [];

  const obituaryCards = await page.$$('article[data-testid="obituary-card"]');

  for (const card of obituaryCards) {
    const name = await card.$eval('h2', el => el.innerText).catch(() => null);
    const location = await card.$eval('span[data-testid="location"]', el => el.innerText).catch(() => null);
    const date = await card.$eval('span[data-testid="death-date"]', el => el.innerText).catch(() => null);
    const link = await card.$eval('a', el => el.href).catch(() => null);

    if (link) {
      const detailPage = await browser.newPage();
      await detailPage.goto(link);
      const fullText = await detailPage.$eval('section[data-testid="obituary-text"]', el => el.innerText).catch(() => '');
      const relatives = extractRelatives(fullText);
      await detailPage.close();

      results.push({
        name,
        location,
        dateOfDeath: date,
        relatives,
        source: link
      });
    }
  }

  await browser.close();
  fs.writeFileSync('legacy_results.json', JSON.stringify(results, null, 2));
  console.log('Scraping complete. Results saved to legacy_results.json');
}

function extractRelatives(text) {
  const relatives = [];
  const patterns = [
    /survived by.*?(?:his|her)?\s?(?:wife|husband|spouse|children|son|daughter|parents|siblings)[^.\n]+/gi,
    /(wife|husband|son|daughter|mother|father|brother|sister)[^,.]+/gi
  ];

  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) relatives.push(...matches);
  });

  return [...new Set(relatives.map(r => r.trim()))];
}

scrapeLegacy(); 