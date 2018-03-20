const { Pool } = require('pg');
const { config } = require('dotenv');

config();

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Error on idle client', err);
  process.exit(-1);
});

(async () => {
  const client = await pool.connect();

  try {
    await client.query('DROP TABLE IF EXISTS ranking');
    await client.query('CREATE TABLE ranking (id SERIAL PRIMARY KEY, name VARCHAR(100), power INTEGER NOT NULL, avgError NUMERIC NOT NULL)');

    for (let i = 0; i < 10; i++) {
      const userNum = Math.floor(Math.random() * 10);

      const name = `user${userNum}`;
      const power = Math.floor(Math.random() * 1000);
      const avgError = Math.random() * 100;

      await client.query('INSERT INTO ranking (name, power, avgError) VALUES ($1, $2, $3)', [name, power, avgError]);
    }
  } catch (err) {
    console.error(err.stack) ;
  } finally {
    client.release();
  }
})();
