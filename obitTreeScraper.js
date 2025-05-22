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

export async function scrapeObitTree(name, location) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://obittree.com/', { waitUntil: 'domcontentloaded' });

    // Fill in the search form if present
    if (name) {
      await page.fill('input[name="search"]', name);
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
    await page.waitForSelector('a[href*="/obituary/"]', { timeout: 10000 });

    // Get up to 10 obituary links
    const obituaryLinks = await page.$$eval('a[href*="/obituary/"]', links => {
      const seen = new Set();
      return links
        .map(link => ({ href: link.href, text: link.textContent.trim() }))
        .filter(l => {
          if (seen.has(l.href)) return false;
          seen.add(l.href);
          return l.text.length > 0;
        })
        .slice(0, 10);
    });

    for (const { href } of obituaryLinks) {
      await page.goto(href, { waitUntil: 'domcontentloaded' });
      // Extract details from the obituary page
      const name = await page.$eval('h1', el => el.textContent.trim()).catch(() => '');
      let birthDate = '';
      let deathDate = '';
      let cemetery = '';
      let location = '';
      let relatives = [];

      // Try to extract birth/death dates and location from the page
      const dateBlock = await page.$('div:has-text("Born")');
      if (dateBlock) {
        const text = await dateBlock.textContent();
        const match = text.match(/Born\s*([\w\s,]+)\s*-\s*Died\s*([\w\s,]+)/);
        if (match) {
          birthDate = match[1].trim();
          deathDate = match[2].trim();
        }
      }
      // Try to extract location
      const locBlock = await page.$('div:has-text("Location")');
      if (locBlock) {
        location = (await locBlock.textContent()).replace('Location', '').trim();
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

      // Save to MongoDB
      await Record.create({
        name,
        birthDate,
        deathDate,
        cemetery,
        location,
        relatives,
        source: 'ObitTree',
        url: href,
      });
    }
  } catch (err) {
    console.error('ObitTree scraper error:', err);
  } finally {
    await browser.close();
  }
} 