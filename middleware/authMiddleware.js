const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

// Role-based Access Control
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin only' });
  }
};

exports.leader = (req, res, next) => {
  if (req.user && req.user.role === 'leader') {
    next();
  } else {
    res.status(403).json({ message: 'Team leader only' });
  }
};
