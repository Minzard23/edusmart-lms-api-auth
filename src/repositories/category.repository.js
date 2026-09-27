const pool = require('../config/database');

async function getAllCategories() {
    const [rows] = await pool.query('SELECT * FROM course_categories');
    return rows;
}

async function getCategoryById(id) {
    const [categoryRows] = await pool.query('SELECT * FROM course_categories WHERE category_id = ?', [id]);
    if (categoryRows.length === 0)
        return null;
    const [courseRows] = await pool.query('SELECT course_id, title FROM courses WHERE category_id = ?', [id]);
    return { ...categoryRows[0], courses: courseRows };
}

async function createCategory(data) {
    const [result] = await pool.query(
        'INSERT INTO course_categories (category_name, description) VALUES (?, ?)',
        [data.category_name, data.description || null] 
    );
    return result.insertId;
}

async function updateCategory(id, data) {
    await pool.query(
        'UPDATE course_categories SET category_name = ?, description = ? WHERE category_id = ?',
        [data.category_name, data.description || null, id]
    );
}

async function deleteCategory(id) {
    await pool.query('DELETE FROM course_categories WHERE category_id = ?', [id]);
}

async function countCoursesInCategory(id) {
    const [rows] = await pool.query('SELECT COUNT(*) AS course_count FROM courses WHERE category_id = ?', [id]);
    return rows[0].course_count;
}

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, countCoursesInCategory };