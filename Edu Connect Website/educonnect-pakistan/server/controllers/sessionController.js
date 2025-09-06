const Session = require('../models/Session');

const createSession = async (req, res) => {
  try {
    const { student, tutor, sessionDate, sessionType } = req.body;
    const session = new Session({ student, tutor, sessionDate, sessionType });
    await session.save();
    res.status(201).json({ message: 'Session created', session });
  } catch (err) {
    res.status(500).json({ message: 'Error creating session', error: err.message });
  }
};

const getSessionDetails = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId).populate('student tutor');
    res.status(200).json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching session details', error: err.message });
  }
};

const updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updateData = req.body;
    const session = await Session.findByIdAndUpdate(sessionId, updateData, { new: true });
    res.status(200).json({ message: 'Session updated', session });
  } catch (err) {
    res.status(500).json({ message: 'Error updating session', error: err.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    await Session.findByIdAndDelete(sessionId);
    res.status(200).json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting session', error: err.message });
  }
};

module.exports = {
  createSession,
  getSessionDetails,
  updateSession,
  deleteSession
};
