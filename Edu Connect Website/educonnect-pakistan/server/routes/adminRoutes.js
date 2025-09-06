const express = require('express');
const router = express.Router();
const {
  getPendingVerifications,
  verifyTutor,
  rejectTutor,
  getAdminStats
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/adminMiddleware');

router.get('/verifications', protectAdmin, getPendingVerifications);
router.put('/verifications/:id/approve', protectAdmin, verifyTutor);
router.put('/verifications/:id/reject', protectAdmin, rejectTutor);
router.get('/reports', protectAdmin, getAdminStats);

module.exports = router;
