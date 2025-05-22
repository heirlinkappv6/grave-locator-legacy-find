import { chromium } from 'playwright';
import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  name: String,
  birthDate: String,
  deathDate: String,
  cemetery: String,
  location: String,
  relatives: [String],
  source: String,
  url: String,
});
const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);

export async function scrapeFuneralCom(name, location) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://funeral.com/obituaries/', { waitUntil: 'domcontentloaded' });

    // Fill in the search form if present
    if (name) {
      await page.fill('input[name="search"]', name);
    }
    if (location) {
      await page.fill('input[name="location"]', location);
    }
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    // Extract up to 10 obituary cards
    const obituaryLinks = await page.$$eval('.obituary-card a', links => links.slice(0, 10).map(a => a.href));
    for (const url of obituaryLinks) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const name = await page.$eval('.obituary-title', el => el.textContent.trim());
      const birthDate = await page.$eval('.birth-date', el => el.textContent.trim()).catch(() => '');
      const deathDate = await page.$eval('.death-date', el => el.textContent.trim()).catch(() => '');
      const cemetery = await page.$eval('.cemetery', el => el.textContent.trim()).catch(() => '');
      const location = await page.$eval('.location', el => el.textContent.trim()).catch(() => '');
      const relatives = await page.$$eval('.relatives-list li', els => els.map(li => li.textContent.trim()));
      await Record.create({
        name,
        birthDate,
        deathDate,
        cemetery,
        location,
        relatives,
        source: 'Funeral.com',
        url
      });
    }
  } catch (err) {
    console.error('Funeral.com scraper error:', err);
  } finally {
    await browser.close();
  }
} 