const express = require('express');
const { protectTutor } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getTutorProfile,
  updateTutorProfile,
  getTutorEarnings,
  manageSessions,
} = require('../controllers/tutorController');

const router = express.Router();
router.get('/profile', protectTutor, getTutorProfile);
router.put('/profile', protectTutor, upload.single('profilePicture'), updateTutorProfile);
router.get('/earnings', protectTutor, getTutorEarnings);
router.get('/sessions', protectTutor, manageSessions);
router.put('/profile', protectTutor, upload.single('profilePicture'), updateTutorProfile);

module.exports = router;
