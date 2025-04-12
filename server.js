import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

let cachedData = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/data', async (req, res) => {
  if (cachedData) {
    return res.json({ source: 'cache', data: cachedData });
  }

  try {
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard');
    cachedData = await response.json();
    res.json({ source: 'fetched', data: cachedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});