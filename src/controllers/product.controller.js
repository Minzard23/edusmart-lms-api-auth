const productRepository = require('../repositories/product.repository');

// Validasi input product. isUpdate = true artinya field boleh tidak dikirim semua (PATCH)
const validateProduct = (body, isUpdate = false) => {
  const errors = [];
  const { name, price, stock } = body;

  if (!isUpdate || name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      errors.push('name wajib diisi dan berupa teks');
    }
  }

  if (!isUpdate || price !== undefined) {
    if (price === undefined || price === null || isNaN(price) || Number(price) < 0) {
      errors.push('price wajib diisi dan berupa angka >= 0');
    }
  }

  if (stock !== undefined) {
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      errors.push('stock harus berupa bilangan bulat >= 0');
    }
  }

  return errors;
};

const getProducts = async (req, res) => {
  try {
    const products = await productRepository.findAll();
    res.status(200).json({ success: true, message: 'Data Produk Berhasil Diambil', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productRepository.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Detail Produk Berhasil Diambil', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const errors = validateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }
    const product = await productRepository.create(req.body);
    res.status(201).json({ success: true, message: 'Produk Berhasil Ditambahkan', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const existing = await productRepository.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada data yang dikirim untuk diubah' });
    }
    const errors = validateProduct(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }
    const product = await productRepository.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Produk Berhasil Diubah', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await productRepository.remove(req.params.id);
    if (deleted === 0) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Produk Berhasil Dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };