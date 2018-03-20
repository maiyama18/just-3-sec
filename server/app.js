const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const db = require('./db');
const { config } = require('dotenv');

config();

const app = express();
const port = process.env.PORT || 3001;

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool();

pool.on('error', (err) => {
  console.error('Error on idle client', err);
  process.exit(-1);
});

(async () => {
  app.post('/api/result', (req, res) => {
    const result = req.body;
    console.log(result);
    try {
      db.insertResult(pool, result);

      res.send('ok');
    } catch (err) {
      console.log(err.stack);

      res.send('ng')
    }
  });
  app.get('/api/ranking', async (req, res) => {
    const rankingArray = await db.getRanking(pool);

    console.log(rankingArray);
    res.send(rankingArray);
  });

  app.listen(port, (err) => {
    if (err) console.error(err)

    console.log(`listening on port ${port}`);
  });
})();
