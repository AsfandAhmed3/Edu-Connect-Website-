const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'student' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
