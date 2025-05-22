import { chromium } from 'playwright';
import mongoose from 'mongoose';

// Use the same Record model as in server.js
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

export async function scrapeTributes(name, location) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://www.tributes.com/search/obituaries', { waitUntil: 'domcontentloaded' });

    // Fill in the search form if present
    if (name) {
      await page.fill('input[name="firstName"]', name.split(' ')[0] || '');
      await page.fill('input[name="lastName"]', name.split(' ')[1] || '');
    }
    if (location) {
      await page.fill('input[name="location"]', location);
    }
    // Click the search button if present
    const searchBtn = await page.$('button[type="submit"]');
    if (searchBtn) {
      await searchBtn.click();
      await page.waitForLoadState('networkidle');
    }

    // Wait for results to load
    await page.waitForSelector('.search-results .obituary', { timeout: 10000 });

    // Get up to 10 obituary cards
    const obituaryCards = await page.$$('.search-results .obituary');
    for (const card of obituaryCards.slice(0, 10)) {
      const nameText = await card.$eval('.obituary-title', el => el.innerText).catch(() => '');
      const locationText = await card.$eval('.obituary-location', el => el.innerText).catch(() => '');
      const link = await card.$eval('a', el => el.href).catch(() => '');
      let birthDate = '';
      let deathDate = '';
      let cemetery = '';
      let relatives = [];

      // Visit the obituary page for more details if link exists
      if (link) {
        try {
          await page.goto(link, { waitUntil: 'domcontentloaded' });
          // Try to extract birth/death dates
          const dateBlock = await page.$('span:has-text("Born")');
          if (dateBlock) {
            const text = await dateBlock.textContent();
            const match = text.match(/Born\s*([\w\s,]+)\s*-\s*Died\s*([\w\s,]+)/);
            if (match) {
              birthDate = match[1].trim();
              deathDate = match[2].trim();
            }
          }
          // Try to extract cemetery
          const cemBlock = await page.$('div:has-text("Cemetery")');
          if (cemBlock) {
            cemetery = (await cemBlock.textContent()).replace('Cemetery', '').trim();
          }
          // Try to extract relatives (look for a section with 'Family' or 'Survived by')
          const relBlock = await page.$('div:has-text("Family")');
          if (relBlock) {
            relatives = (await relBlock.textContent()).replace('Family', '').split(',').map(r => r.trim()).filter(Boolean);
          }
        } catch (err) {
          // Ignore errors on detail page
        }
      }

      // Save to MongoDB
      await Record.create({
        name: nameText,
        birthDate,
        deathDate,
        cemetery,
        location: locationText,
        relatives,
        source: 'Tributes',
        url: link,
      });
    }
  } catch (err) {
    console.error('Tributes.com scraper error:', err);
  } finally {
    await browser.close();
  }
} 