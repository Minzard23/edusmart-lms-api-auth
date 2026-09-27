const pool = require('../config/database');

function buildCourseQuery(filters = {}) {
    let query = `
      SELECT c.*, 
             cc.category_id AS cat_id, cc.category_name,
             u.user_id AS instr_id, u.name AS instructor_name
      FROM courses c
      LEFT JOIN course_categories cc ON c.category_id = cc.category_id
      LEFT JOIN users u ON c.instructor_id = u.user_id
      WHERE 1=1
    `;
    const params = [];

    if (filters.search) {
        query += ' AND c.title LIKE ?';
        params.push(`%${filters.search}%`);
    }
    if (filters.category_id) {
        query += ' AND c.category_id = ?';
        params.push(filters.category_id);
    }
    if (filters.level) {
        query += ' AND c.level = ?';
        params.push(filters.level);
    }

    const allowedSortFields = ['rating', 'enrolled_count', 'duration', 'price', 'created_at'];
    const sortBy = allowedSortFields.includes(filters.sort_by) ? filters.sort_by : null;
    const order = (filters.order || '').toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    if (sortBy) {
        query += ` ORDER BY c.${sortBy} ${order}`;
    }

    return { query, params };
}

async function getAllCourses(filters = {}) {
    const { query, params } = buildCourseQuery(filters);
    const [rows] = await pool.query(query, params);
    return rows;
}

async function getCourseById(id) {
    const [rows] = await pool.query(`
        SELECT c.*, 
               cc.category_id AS cat_id, cc.category_name,
               u.user_id AS instr_id, u.name AS instructor_name
        FROM courses c
        LEFT JOIN course_categories cc ON c.category_id = cc.category_id
        LEFT JOIN users u ON c.instructor_id = u.user_id
        WHERE c.course_id = ?
        `, [id]);
    return rows[0];
}

async function createCourse(data) {
    const [result] = await pool.query(`
        INSERT INTO courses (title, description, rating, category_id, instructor_id, level, duration, thumbnail, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [data.title, data.description, data.rating, data.category_id, data.instructor_id, data.level, data.duration, data.thumbnail, data.status]);
    return result.insertId;
}

async function updateCourse(id, data) {
    await pool.query(`
        UPDATE courses
        SET title = ?, description = ?, rating = ?, category_id = ?, instructor_id = ?, level = ?, duration = ?, thumbnail = ?, status = ?
        WHERE course_id = ?
    `, [data.title, data.description, data.rating, data.category_id, data.instructor_id, data.level, data.duration, data.thumbnail, data.status, id]);
}

async function deleteCourse(id) {
    await pool.query('DELETE FROM courses WHERE course_id = ?', [id]);
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };