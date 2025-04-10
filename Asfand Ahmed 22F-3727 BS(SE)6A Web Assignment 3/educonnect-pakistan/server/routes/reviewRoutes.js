const express = require('express');
const router = express.Router();
const { createReview, getReviewsForTutor } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/:tutorId', getReviewsForTutor);

module.exports = router;
