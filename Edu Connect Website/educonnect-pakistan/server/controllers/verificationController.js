const VerificationRequest = require('../models/VerificationRequest');
const Tutor = require('../models/Tutor');

const getPendingVerifications = async (req, res) => {
  try {
    const requests = await VerificationRequest.find({ status: 'pending' }).populate('tutor');
    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: 'No pending verification requests found.' });
    }
    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching verification requests', error: err.message });
  }
};

const updateVerificationStatus = async (req, res) => {
  try {
    const { requestId, status, adminComment } = req.body;
    if (!requestId || !status) {
      return res.status(400).json({ message: 'Request ID and status are required.' });
    }
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be "approved" or "rejected".' });
    }

    const request = await VerificationRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Verification request not found.' });
    }

    request.status = status;
    request.adminComment = adminComment || request.adminComment;
    request.updatedAt = Date.now();
    await request.save();

    if (status === 'approved') {
      await Tutor.findByIdAndUpdate(request.tutor, { verified: true });
    }

    res.status(200).json({ message: 'Verification status updated', request });
  } catch (err) {
    res.status(500).json({ message: 'Error updating verification status', error: err.message });
  }
};

module.exports = {
  getPendingVerifications,
  updateVerificationStatus
};
