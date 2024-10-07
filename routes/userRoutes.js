const express = require('express');
const { getAllUsers, updateUser, deleteUser, getManagedEmployees } = require('../controllers/userController');
const { protect, admin, leader } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin & Team Leader Routes
router.get('/', protect, admin, getAllUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, admin, deleteUser);

// Team Leader Route
router.get('/leader/:leaderId/employees', protect, leader, getManagedEmployees);

module.exports = router;
