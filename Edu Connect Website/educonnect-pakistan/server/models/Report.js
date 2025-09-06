const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reportType: { type: String, required: true },
  data: { type: Object, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
