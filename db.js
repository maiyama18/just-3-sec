const insertResultText = 'INSERT INTO ranking (name, power, avgError) VALUES ($1, $2, $3)'
const getRankingText = 'SELECT name, power, avgError FROM ranking ORDER BY power DESC, avgError ASC LIMIT 20'

module.exports = {
  insertResult: (pool, result) => pool.query(insertResultText, [result.name, result.power, result.avgError]),
  getRanking: async (pool) => {
    const result = await pool.query(getRankingText);

    return result.rows.map(row => ({
      name: row.name,
      power: row.power,
      avgError: parseFloat(row.avgerror).toFixed(3),
    }));
  }
};
