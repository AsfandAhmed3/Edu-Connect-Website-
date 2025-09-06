const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessionDetails,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');

router.post('/', createSession);
router.get('/:sessionId', getSessionDetails);
router.put('/:sessionId', updateSession);
router.delete('/:sessionId', deleteSession);

module.exports = router;
