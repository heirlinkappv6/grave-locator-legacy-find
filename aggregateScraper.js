import { scrapeLegacy } from './legacyScraper.js';
import { scrapeFindAGrave } from './findAGraveScraper.js';

(async () => {
  try {
    console.log('--- Starting Heir Link Multi-Source Scraper ---');

    await scrapeLegacy();
    console.log('✔ Legacy.com data scraped successfully.');

    await scrapeFindAGrave();
    console.log('✔ FindAGrave.com data scraped successfully.');

    console.log('--- All sources completed. Data stored locally. ---');
  } catch (error) {
    console.error('Error running aggregate scraper:', error);
  }
})(); 