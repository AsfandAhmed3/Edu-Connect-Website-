const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
