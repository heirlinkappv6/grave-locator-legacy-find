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

export async function scrapeNYTimes(name, location) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Build a search query
  const query = encodeURIComponent(`${name} ${location} obituary`);
  await page.goto(`https://www.nytimes.com/search?query=${query}`);

  // Wait for results to load
  await page.waitForSelector('ol[data-testid="search-results"]', { timeout: 10000 }).catch(() => null);

  // Extract up to 5 obituary articles
  const articles = await page.$$eval('ol[data-testid="search-results"] li', nodes =>
    nodes.slice(0, 5).map(li => {
      const title = li.querySelector('h4')?.innerText || '';
      const link = li.querySelector('a')?.href || '';
      const snippet = li.querySelector('p')?.innerText || '';
      const date = li.querySelector('time')?.getAttribute('datetime') || '';
      return { title, link, snippet, date };
    })
  );

  for (const article of articles) {
    // Save to MongoDB
    await Record.create({
      name: article.title,
      deathDate: article.date,
      location,
      source: article.link,
    });
  }

  await browser.close();
  return articles;
} 