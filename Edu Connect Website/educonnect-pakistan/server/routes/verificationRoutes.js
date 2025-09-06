const express = require('express');
const router = express.Router();
const { getPendingVerifications, updateVerificationStatus } = require('../controllers/verificationController');
router.get('/pending', getPendingVerifications);
router.put('/update', updateVerificationStatus);

module.exports = router;
