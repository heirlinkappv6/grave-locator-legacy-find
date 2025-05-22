import { chromium } from 'playwright';
import fs from 'fs';

export async function scrapeFindAGrave() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Go to the recent memorials page (adjust location filters as needed)
  await page.goto('https://www.findagrave.com/memorial/search?orderby=created&page=1');

  const results = [];

  // Get links to the first 10 memorials (can increase)
  const links = await page.$$eval('a[href*="/memorial/"]', anchors =>
    anchors.map(a => a.href).filter((v, i, a) => a.indexOf(v) === i).slice(0, 10)
  );

  for (const url of links) {
    try {
      const memorialPage = await browser.newPage();
      await memorialPage.goto(url, { waitUntil: 'domcontentloaded' });

      const name = await memorialPage.$eval('h1[data-qa-id="memorial-name"]', el => el.innerText).catch(() => null);
      const birthDeath = await memorialPage.$$eval('.fg-underline', els => els.map(el => el.innerText));
      const birthDate = birthDeath[0] || null;
      const deathDate = birthDeath[1] || null;
      const cemetery = await memorialPage.$eval('div[data-qa-id="cemetery-name"]', el => el.innerText).catch(() => null);
      const location = await memorialPage.$eval('div[data-qa-id="cemetery-location"]', el => el.innerText).catch(() => null);

      const relatives = await memorialPage.$$eval('a[href*="/memorial/"]', links => {
        return links
          .filter(link => /Mother|Father|Spouse|Sibling|Son|Daughter/.test(link.innerText))
          .map(link => link.innerText.trim());
      });

      results.push({
        name,
        birthDate,
        deathDate,
        cemetery,
        location,
        relatives,
        source: url
      });

      await memorialPage.close();
    } catch (err) {
      console.error(`Error scraping ${url}:`, err);
    }
  }

  await browser.close();
  fs.writeFileSync('findagrave_results.json', JSON.stringify(results, null, 2));
  console.log('Scraping complete. Results saved to findagrave_results.json');
} 