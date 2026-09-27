const express = require('express');
const app = express();

app.use(express.json());

const courseRoutes = require('./routes/course.routes');
app.use('/api/courses', courseRoutes);

const categoryRoutes = require('./routes/category.routes');
app.use('/api/categories', categoryRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API Edusmart LMS API' });
});

// Endpoint yang tidak terdaftar
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

module.exports = app;