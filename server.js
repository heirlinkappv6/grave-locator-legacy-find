import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { scrapeLegacy } from './legacyScraper.js';
import { scrapeFindAGrave } from './findAGraveScraper.js';
import { scrapeTributes } from './tributesScraper.js';
import { scrapeNYTimes } from './nyTimesScraper.js';
import { scrapeLATimes } from './latimesScraper.js';
import { scrapeChicagoTribune } from './chicagoTribuneScraper.js';
import { scrapeDignityMemorial } from './dignityMemorialScraper.js';
import { scrapeEverLoved } from './everLovedScraper.js';
import { scrapeEchovita } from './echovitaScraper.js';
import { scrapeObitTree } from './obitTreeScraper.js';
import { scrapeFuneralCom } from './funeralComScraper.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://heirlinkcluster:Jahnai19!@cluster0.ecstsxr.mongodb.net/heirlink?retryWrites=true&w=majority&appName=Cluster0', {
  // useNewUrlParser and useUnifiedTopology are not needed for Mongoose 6+
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('✅ Connected to MongoDB'));

// Define record schema
const recordSchema = new mongoose.Schema({
  name: String,
  birthDate: String,
  deathDate: String,
  cemetery: String,
  location: String,
  relatives: [String],
  source: String,
});
const Record = mongoose.model('Record', recordSchema);

// Example route
app.get('/', (req, res) => {
  res.send('Obituary API is running');
});

// POST /search endpoint
app.post('/search', async (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required.' });
  }

  try {
    let results = await Record.find({
      name: new RegExp(name, 'i'),
      location: new RegExp(location, 'i'),
    });

    if (results.length > 0) {
      return res.json({ fromCache: true, results });
    }

    console.log('🧠 No cached results found. Scraping now...');
    await Promise.all([
      scrapeLegacy(name, location),
      scrapeFindAGrave(name, location),
      scrapeTributes(name, location),
      scrapeNYTimes(name, location),
      scrapeLATimes(name, location),
      scrapeChicagoTribune(name, location),
      scrapeDignityMemorial(name, location),
      scrapeEverLoved(name, location),
      scrapeEchovita(name, location),
      scrapeObitTree(name, location),
      scrapeFuneralCom(name, location),
    ]);

    results = await Record.find({
      name: new RegExp(name, 'i'),
      location: new RegExp(location, 'i'),
    });

    res.json({ fromCache: false, results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error during search.' });
  }
});

// GET /results endpoint
app.get('/results', async (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: 'Missing name or location query.' });
  }

  try {
    const results = await Record.find({
      name: new RegExp(name, 'i'),
      location: new RegExp(location, 'i'),
    });

    res.json({ results });
  } catch (err) {
    console.error('Results query error:', err);
    res.status(500).json({ error: 'Server error during results query.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Heir Link API is live at http://localhost:${PORT}`);
}); 