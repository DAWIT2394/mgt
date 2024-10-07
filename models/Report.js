const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
