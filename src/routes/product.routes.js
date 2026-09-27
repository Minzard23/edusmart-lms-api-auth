const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected (wajib token)
router.post('/', authenticate, createProduct);
router.patch('/:id', authenticate, updateProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;