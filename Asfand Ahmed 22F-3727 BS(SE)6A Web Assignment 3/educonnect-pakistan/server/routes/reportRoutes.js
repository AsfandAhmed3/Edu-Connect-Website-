const express = require('express');
const router = express.Router();
const { generateReport, getReportById } = require('../controllers/reportController');

router.post('/generate', generateReport);
router.get('/:reportId', getReportById);

module.exports = router;
