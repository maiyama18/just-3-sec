const insertResult = async (client, result) => {
  try {
    const { name, power, avgError } = result;

    client.query('INSERT INTO ranking (name, power, avgError) VALUES ($1, $2, $3)', [name, power, avgError]);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

module.exports = insertResult;
