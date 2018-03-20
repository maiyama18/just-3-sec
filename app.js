const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { parse } = require('pg-connection-string');
const db = require('./db');
const { config } = require('dotenv');

config();

const app = express();
const port = process.env.PORT || 3001;

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Error on idle client', err);
  process.exit(-1);
});

(async () => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS ranking (id SERIAL PRIMARY KEY, name VARCHAR(100), power INTEGER NOT NULL, avgError NUMERIC NOT NULL)');
    console.log('created table ranking')
  } catch (err) {
    console.error(err.stack);
  }

  app.post('/api/result', (req, res) => {
    const result = req.body;
    try {
      db.insertResult(pool, result);
      res.send('ok');
    } catch (err) {
      console.error(err.stack);
      res.send('ng')
    }
  });
  app.get('/api/ranking', async (req, res) => {
    try {
      const rankingArray = await db.getRanking(pool);
      res.send(rankingArray);
    } catch (err) {
      console.error(err.stack)
    }
  });

  app.listen(port, (err) => {
    if (err) console.error(err)

    console.log(`listening on port ${port}`);
  });
})();
