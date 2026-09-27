const courseRepository = require('../repositories/course.repository');
const categoryRepository = require('../repositories/category.repository');

function getRatingClass(rating) {
    const r = parseFloat(rating);
    if (r >= 8.5) return 'Top Rated';
    if (r >= 7.0) return 'Recommended';
    return 'Regular';
}

function mapCourse(row) {
    if (!row) return row;
    return {
        course_id: row.course_id,
        title: row.title,
        description: row.description,
        rating: row.rating,
        thumbnail: row.thumbnail,
        level: row.level,
        duration: row.duration,
        enrolled_count: row.enrolled_count,
        status: row.status,
        price: row.price,
        quota: row.quota,
        created_at: row.created_at,
        category: { id: row.cat_id, name: row.category_name },
        instructor: { id: row.instr_id, name: row.instructor_name },
        rating_class: getRatingClass(row.rating)
    };
}

async function getAllCourses(req, res) {
    try {
        const { search, category_id, level, sort_by, order } = req.query;
        const courses = await courseRepository.getAllCourses({ search, category_id, level, sort_by, order });
        res.json({ success: true, message: 'Data Kursus Berhasil Diambil', data: courses.map(mapCourse) });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

async function getCourseById(req, res) {
    try {
        const course = await courseRepository.getCourseById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
        }
        res.json({ success: true, message: 'Detail kursus berhasil diambil', data: mapCourse(course) });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

async function createCourse(req, res) {
    const { title, description, rating, category_id, instructor_id, level, duration, thumbnail, status } = req.body;

    const errors = {};
    if (!title || typeof title !== 'string' || title.length > 255) {
        errors.title = ['Title wajib diisi, string, maksimal 255 karakter'];
    }
    if (!description || typeof description !== 'string') {
        errors.description = ['Description wajib diisi'];
    }
    if (rating === undefined || isNaN(rating) || rating < 0 || rating > 10) {
        errors.rating = ['Rating wajib diisi, angka antara 0-10'];
    }
    if (!category_id) {
        errors.category_id = ['Category wajib diisi'];
    } else {
        const categoryExists = await categoryRepository.getCategoryById(category_id);
        if (!categoryExists) {
            errors.category_id = ['Category tidak ditemukan'];
        }
    }
    if (!instructor_id) {
        errors.instructor_id = ['Instructor wajib diisi'];
    }
    if (!level || !['beginner', 'intermediate', 'advanced'].includes(level)) {
        errors.level = ['Level wajib diisi: beginner, intermediate, atau advanced'];
    }
    if (!duration || !Number.isInteger(duration) || duration < 1) {
        errors.duration = ['Duration wajib diisi, integer, minimal 1'];
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }

    // Otorisasi sederhana: pengirim request harus instructor yang sama dengan instructor_id
    const requesterId = req.headers['x-user-id'];
    if (!requesterId || parseInt(requesterId) !== parseInt(instructor_id)) {
        return res.status(403).json({ success: false, message: 'Anda tidak memiliki akses untuk mengubah data ini' });
    }

    try {
        const newId = await courseRepository.createCourse({
            title, description, rating, category_id, instructor_id, level, duration,
            thumbnail: thumbnail || null,
            status: status || 'draft'
        });
        const newCourse = await courseRepository.getCourseById(newId);
        res.status(201).json({ success: true, message: 'Kursus berhasil ditambahkan', data: mapCourse(newCourse) });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

async function updateCourse(req, res) {
    const existing = await courseRepository.getCourseById(req.params.id);
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    // Otorisasi: hanya owner/instructor course ini yang boleh update
    const requesterId = req.headers['x-user-id'];
    if (!requesterId || parseInt(requesterId) !== parseInt(existing.instructor_id)) {
        return res.status(403).json({ success: false, message: 'Anda tidak memiliki akses untuk mengubah data ini' });
    }

    const { title, description, rating, category_id, instructor_id, level, duration, thumbnail, status } = req.body;

    const errors = {};
    if (!title || typeof title !== 'string' || title.length > 255) {
        errors.title = ['Title wajib diisi, string, maksimal 255 karakter'];
    }
    if (!description || typeof description !== 'string') {
        errors.description = ['Description wajib diisi'];
    }
    if (rating === undefined || isNaN(rating) || rating < 0 || rating > 10) {
        errors.rating = ['Rating wajib diisi, angka antara 0-10'];
    }
    if (category_id) {
        const categoryExists = await categoryRepository.getCategoryById(category_id);
        if (!categoryExists) {
            errors.category_id = ['Category tidak ditemukan'];
        }
    }
    if (!level || !['beginner', 'intermediate', 'advanced'].includes(level)) {
        errors.level = ['Level wajib diisi: beginner, intermediate, atau advanced'];
    }
    if (!duration || !Number.isInteger(duration) || duration < 1) {
        errors.duration = ['Duration wajib diisi, integer, minimal 1'];
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }

    try {
        await courseRepository.updateCourse(req.params.id, {
            title, description, rating,
            category_id: category_id || existing.category_id,
            instructor_id: existing.instructor_id,
            level, duration,
            thumbnail: thumbnail || null,
            status: status || 'draft'
        });
        const updated = await courseRepository.getCourseById(req.params.id);
        res.json({ success: true, message: 'Kursus berhasil diupdate', data: mapCourse(updated) });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

async function deleteCourse(req, res) {
    const existing = await courseRepository.getCourseById(req.params.id);
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    const requesterId = req.headers['x-user-id'];
    if (!requesterId || parseInt(requesterId) !== parseInt(existing.instructor_id)) {
        return res.status(403).json({ success: false, message: 'Anda tidak memiliki akses untuk mengubah data ini' });
    }

    try {
        await courseRepository.deleteCourse(req.params.id);
        res.json({ success: true, message: 'Kursus berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };