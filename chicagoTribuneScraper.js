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
});
const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);

export async function scrapeChicagoTribune(name, location) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Go to the Chicago Tribune obituaries page on Legacy.com
  await page.goto('https://www.legacy.com/us/obituaries/chicagotribune/');

  // Wait for obituary cards to load
  await page.waitForSelector('article[data-testid="obituary-card"]', { timeout: 10000 }).catch(() => null);

  // Extract up to 10 obituary cards
  const cards = await page.$$('article[data-testid="obituary-card"]');
  let results = [];

  for (const card of cards.slice(0, 10)) {
    const nameText = await card.$eval('h2', el => el.innerText).catch(() => null);
    const locationText = await card.$eval('span[data-testid="location"]', el => el.innerText).catch(() => null);
    const date = await card.$eval('span[data-testid="death-date"]', el => el.innerText).catch(() => null);
    const link = await card.$eval('a', el => el.href).catch(() => null);

    // Filter by name/location if provided
    if (
      (!name || (nameText && nameText.toLowerCase().includes(name.toLowerCase()))) &&
      (!location || (locationText && locationText.toLowerCase().includes(location.toLowerCase())))
    ) {
      await Record.create({
        name: nameText,
        deathDate: date,
        location: locationText,
        source: link,
      });
      results.push({ name: nameText, deathDate: date, location: locationText, source: link });
    }
  }

  await browser.close();
  return results;
} 