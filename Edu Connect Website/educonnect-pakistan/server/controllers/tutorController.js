const Tutor = require('../models/Tutor');
const Session = require('../models/Session');
const VerificationRequest = require('../models/VerificationRequest');

const getTutorProfile = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.user.id).select('-password');
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.status(200).json(tutor);
  } catch (error) {
    console.error("Error in getTutorProfile:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTutorProfile = async (req, res) => {
    try {
      const updatedData = { ...req.body };
  
      if (req.file) {
        updatedData.profilePicture = req.file.path;
      }
  
      const tutor = await Tutor.findByIdAndUpdate(req.user.id, updatedData, { new: true });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
  
      const existingRequest = await VerificationRequest.findOne({
        tutor: req.user.id,
        status: 'pending'
      });
  
      if (!existingRequest) {
        const newRequest = new VerificationRequest({
          tutor: req.user.id,
          status: 'pending',
          submittedAt: new Date()
        });
  
        await newRequest.save();
      }
  
      res.status(200).json(tutor);
    } catch (error) {
      console.error('Error updating tutor profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
// Get Tutor Earnings
const getTutorEarnings = async (req, res) => {
  try {
    const sessions = await Session.find({ tutor: req.user.id, status: 'completed' });
    const earnings = sessions.reduce((total, session) => total + (session.amount || 0), 0);
    res.status(200).json({ totalEarnings: earnings, sessions });
  } catch (error) {
    console.error("Error in getTutorEarnings:", error);
    res.status(500).json({ message: 'Error fetching earnings' });
  }
};

const manageSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ tutor: req.user.id });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error in manageSessions:", error);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
};

module.exports = {
  getTutorProfile,
  updateTutorProfile,
  getTutorEarnings,
  manageSessions,
};
