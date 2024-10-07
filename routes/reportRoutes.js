const express = require('express');
const { submitReport, getReports } = require('../controllers/reportController');
const { protect, leader } = require('../middleware/authMiddleware');
const router = express.Router();

// Employee Route
router.post('/submit', protect, submitReport);

// Team Leader & Admin Routes
router.get('/', protect, leader, getReports);

module.exports = router;
