const User = require('../models/User');

// Get All Users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Information (Admin & Team Leader)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete User (Admin only)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Employees Managed by a Team Leader
exports.getManagedEmployees = async (req, res) => {
  const { leaderId } = req.params;
  try {
    const leader = await User.findById(leaderId).populate('managedEmployees');
    res.status(200).json(leader.managedEmployees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
