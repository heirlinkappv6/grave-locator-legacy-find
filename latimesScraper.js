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

export async function scrapeLATimes(name, location) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.latimes.com/obituaries');

  // Wait for articles to load
  await page.waitForSelector('article', { timeout: 10000 }).catch(() => null);

  // Extract up to 10 obituary articles
  const articles = await page.$$eval('article', nodes =>
    nodes.slice(0, 10).map(article => {
      const headline = article.querySelector('h2, h3')?.innerText || '';
      const link = article.querySelector('a')?.href || '';
      const summary = article.querySelector('p')?.innerText || '';
      const date = article.querySelector('time')?.getAttribute('datetime') || '';
      return { headline, link, summary, date };
    })
  );

  // Filter by name/location if provided
  const filtered = articles.filter(a =>
    (!name || a.headline.toLowerCase().includes(name.toLowerCase())) &&
    (!location || a.summary.toLowerCase().includes(location.toLowerCase()))
  );

  for (const article of filtered) {
    await Record.create({
      name: article.headline,
      deathDate: article.date,
      location,
      source: article.link,
    });
  }

  await browser.close();
  return filtered;
} 