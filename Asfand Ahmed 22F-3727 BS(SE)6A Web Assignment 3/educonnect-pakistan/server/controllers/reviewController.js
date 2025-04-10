const Review = require('../models/Review');
const Tutor = require('../models/Tutor');

const createReview = async (req, res) => {
  try {
    const { student, tutor, rating, comment, session } = req.body;
    const review = new Review({ student, tutor, rating, comment, session });
    await review.save();
    await Tutor.findByIdAndUpdate(tutor, { $push: { reviews: review._id } });
    res.status(201).json({ message: 'Review created', review });
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

const getReviewsForTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const reviews = await Review.find({ tutor: tutorId }).populate('student');
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

module.exports = { createReview, getReviewsForTutor };
