const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id);

      if (!admin || admin.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized as admin' });
      }

      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};
