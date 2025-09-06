const VerificationRequest = require('../models/VerificationRequest');
const Tutor = require('../models/Tutor');

exports.getPendingVerifications = async (req, res) => {
  const requests = await VerificationRequest.find({ status: 'pending' }).populate('tutor');
  res.json(requests);
};

exports.verifyTutor = async (req, res) => {
  const request = await VerificationRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });

  request.status = 'approved';
  await request.save();

  await Tutor.findByIdAndUpdate(request.tutor, { isVerified: true });

  res.json({ message: 'Tutor verified successfully' });
};

exports.rejectTutor = async (req, res) => {
  const request = await VerificationRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });

  request.status = 'rejected';
  request.comment = req.body.comment || '';
  await request.save();

  res.json({ message: 'Tutor verification rejected' });
};


exports.getAdminStats = async (req, res) => {
  
  const stats = {
    totalTutors: await Tutor.countDocuments(),
    verifiedTutors: await Tutor.countDocuments({ isVerified: true }),
    pendingVerifications: await VerificationRequest.countDocuments({ status: 'pending' }),
  };
  res.json(stats);
};
