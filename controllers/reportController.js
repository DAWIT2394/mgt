const Report = require('../models/Report');

// Submit Report (Employee)
exports.submitReport = async (req, res) => {
  const { title, description } = req.body;
  try {
    const report = await Report.create({
      title,
      description,
      submittedBy: req.user._id
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Reports (Team Leader & Admin)
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('submittedBy', 'name');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
