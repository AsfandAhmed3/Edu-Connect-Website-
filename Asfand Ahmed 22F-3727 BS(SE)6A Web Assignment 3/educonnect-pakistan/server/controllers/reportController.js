const Report = require('../models/Report');

const generateReport = async (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.body;
    if (!reportType) {
      return res.status(400).json({ message: 'Report type is required.' });
    }

    let start, end;
    if (startDate) {
      start = new Date(startDate);
      if (isNaN(start.getTime())) {
        return res.status(400).json({ message: 'Invalid start date.' });
      }
    }
    if (endDate) {
      end = new Date(endDate);
      if (isNaN(end.getTime())) {
        return res.status(400).json({ message: 'Invalid end date.' });
      }
    }

    const dummyData = { reportType, summary: 'Dummy report data' };
    const report = new Report({ reportType, data: dummyData, startDate: start, endDate: end });
    await report.save();

    res.status(201).json({ message: 'Report generated', report });
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message });
  }
};

const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;
    if (!reportId) {
      return res.status(400).json({ message: 'Report ID is required.' });
    }
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.status(200).json({ report });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching report', error: err.message });
  }
};

module.exports = { generateReport, getReportById };
