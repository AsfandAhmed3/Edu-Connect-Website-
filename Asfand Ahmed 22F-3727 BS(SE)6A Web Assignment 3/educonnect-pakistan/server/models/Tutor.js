const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  subjects: {
    type: [String], 
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  location: {
    type: String, 
    required: true
  },
  availability: {
    type: Map, 
    of: [String],
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      rating: { type: Number, required: true },
      comment: { type: String }
    }
  ],
  earnings: {
    totalEarnings: { type: Number, default: 0 },
    transactions: [
      {
        sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now }
      }
    ]
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Tutor', TutorSchema);
