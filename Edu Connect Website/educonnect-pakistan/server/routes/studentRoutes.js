const express = require('express');
const router = express.Router();
const {
  searchTutors,
  bookSession,
  getStudentSessions,
  submitReview,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/studentController');
router.get('/search-tutors', searchTutors);
router.post('/book-session', bookSession);
router.get('/sessions/:studentId', getStudentSessions);
router.post('/submit-review', submitReview);
router.post('/wishlist/add', addToWishlist);
router.post('/wishlist/remove', removeFromWishlist);

module.exports = router;
