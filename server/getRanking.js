const getRanking = async (client) => {
  try {
    const results = await client.query('SELECT name, power, avgError FROM ranking ORDER BY power DESC LIMIT 20');

    return results.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

module.exports = getRanking;
