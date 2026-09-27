const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Header harus berbentuk: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Akses ditolak, token tidak ditemukan' });
  }

    const token = authHeader.slice(7).trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // data user dari token bisa dipakai di controller
    next();
      } catch (error) {
    return res.status(401).json({ success: false, message: 'Token tidak valid atau sudah kedaluwarsa' });
  }
};

module.exports = authenticate;