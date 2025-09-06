const Tutor = require('../models/Tutor');
const Session = require('../models/Session');
const Review = require('../models/Review');
const Student = require('../models/Student');

const searchTutors = async (req, res) => {
  try {
    const { subject, location, priceMin, priceMax, rating, availability } = req.query;
    let filter = {};
    if (subject) filter.subjects = subject;
    if (rating) filter.averageRating = { $gte: rating };
    const tutors = await Tutor.find(filter);
    res.status(200).json({ tutors });
  } catch (err) {
    res.status(500).json({ message: 'Error searching tutors', error: err.message });
  }
};

const bookSession = async (req, res) => {
  try {
    const { studentId, tutorId, sessionDate, sessionType } = req.body;
    const newSession = new Session({ student: studentId, tutor: tutorId, sessionDate, sessionType });
    await newSession.save();
    await Student.findByIdAndUpdate(studentId, { $push: { sessions: newSession._id } });
    await Tutor.findByIdAndUpdate(tutorId, { $push: { sessions: newSession._id } });
    res.status(201).json({ message: 'Session booked successfully', session: newSession });
  } catch (err) {
    res.status(500).json({ message: 'Error booking session', error: err.message });
  }
};

const getStudentSessions = async (req, res) => {
  try {
    const { studentId } = req.params;
    const sessions = await Session.find({ student: studentId });
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sessions', error: err.message });
  }
};

const submitReview = async (req, res) => {
  try {
    const { studentId, tutorId, rating, comment, sessionId } = req.body;
    const newReview = new Review({ student: studentId, tutor: tutorId, rating, comment, session: sessionId });
    await newReview.save();
    await Tutor.findByIdAndUpdate(tutorId, { $push: { reviews: newReview._id } });
    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting review', error: err.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { wishlist: tutorId } },
      { new: true }
    );
    res.status(200).json({ message: 'Tutor added to wishlist', wishlist: student.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error updating wishlist', error: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { wishlist: tutorId } },
      { new: true }
    );
    res.status(200).json({ message: 'Tutor removed from wishlist', wishlist: student.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error updating wishlist', error: err.message });
  }
};

module.exports = {
  searchTutors,
  bookSession,
  getStudentSessions,
  submitReview,
  addToWishlist,
  removeFromWishlist
};
