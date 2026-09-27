const pool = require('../config/database');

const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ name, description, price, stock }) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
    [name, description ?? null, price, stock ?? 0]
  );
  return findById(result.insertId);
};

const update = async (id, data) => {
  const allowed = ['name', 'description', 'price', 'stock'];
  const fields = [];
  const values = [];

  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }

  if (fields.length === 0) return findById(id);

  await pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, [...values, id]);
  return findById(id);
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = { findAll, findById, create, update, remove };