const pool = require('../config/database');

const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async ({ name, email, password }) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );

  const [rows] = await pool.query(
    'SELECT user_id, name, email, role, created_at FROM users WHERE user_id = ?',
    [result.insertId]
  );
  return rows[0];
};

module.exports = { findUserByEmail, createUser };