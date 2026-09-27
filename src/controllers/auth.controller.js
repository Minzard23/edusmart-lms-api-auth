const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/auth.repository');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi input
    const errors = [];
    if (!name || name.trim() === '') errors.push('name wajib diisi');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('email wajib diisi dengan format yang benar');
    if (!password || password.length < 6) errors.push('password minimal 6 karakter');
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }

    // Cek email sudah dipakai atau belum
    const existing = await authRepository.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar' });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authRepository.createUser({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'Registrasi Berhasil', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' });
    }

    const user = await authRepository.findUserByEmail(email);

    // Pesan dibuat sama supaya orang tidak bisa menebak email mana yang terdaftar
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login Berhasil',
      data: {
        token,
        user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

module.exports = { register, login };