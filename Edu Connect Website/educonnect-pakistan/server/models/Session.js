const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  sessionDate: { type: Date, required: true },
  sessionType: { type: String, enum: ['online', 'in-person'], required: true },
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

SessionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Session', SessionSchema);
