const categoryRepository = require('../repositories/category.repository');

async function getAllCategories(req, res) {
    try{
        const categories = await categoryRepository.getAllCategories();
        res.json({ success: true, message: 'Data Kategori Berhasil diambil', data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occurred while fetching categories', error: error.message });
    }
}

async function getCategoryById(req, res) {
    try {
        const category = await categoryRepository.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
        }
        res.json({ success: true, message: 'Detail kategori berhasil diambil', data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

async function createCategory(req, res) {
    const { category_name, description } = req.body;

    const errors = {};
    if (!category_name || typeof category_name !== 'string' || category_name.length > 100) {
        errors.category_name = ['Nama kategori wajib diisi, string, maksimal 100 karakter'];
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }

    try {
        const newId = await categoryRepository.createCategory({ category_name, description });
        const newCategory = await categoryRepository.getCategoryById(newId);
        res.status(201).json({ success: true, message: 'Kategori berhasil ditambahkan', data: newCategory });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Validasi gagal', errors: { category_name: ['Nama kategori sudah digunakan'] } });
        }
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

async function updateCategory(req, res) {
    const existing = await categoryRepository.getCategoryById(req.params.id);
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    const { category_name, description } = req.body;
    const errors = {};
    if (!category_name || typeof category_name !== 'string' || category_name.length > 100) {
        errors.category_name = ['Nama kategori wajib diisi, string, maksimal 100 karakter'];
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }

    try {
        await categoryRepository.updateCategory(req.params.id, { category_name, description });
        const updated = await categoryRepository.getCategoryById(req.params.id);
        res.json({ success: true, message: 'Kategori berhasil diupdate', data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

async function deleteCategory(req, res) {
    const existing = await categoryRepository.getCategoryById(req.params.id);
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    const totalCourses = await categoryRepository.countCoursesInCategory(req.params.id);
    if (totalCourses > 0) {
        return res.status(400).json({ success: false, message: 'Kategori tidak bisa dihapus karena masih memiliki kursus terkait' });
    }

    try {
        await categoryRepository.deleteCategory(req.params.id);
        res.json({ success: true, message: 'Kategori berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server', errors: error.message });
    }
}

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };