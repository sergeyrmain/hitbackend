const Cost = require('../models/cost');
const Report = require('../models/report');

exports.getReport = async (req, res) => {
  const { user_id, year, month } = req.query;

  // Validate input
  if (!user_id || !year || !month) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the report exists in the database
    let existingReport = await Report.findOne({ user_id, year, month });

    if (existingReport) {
      // Report exists, return it directly
      return res.json(existingReport.report);
    }

    // Query the database to get the cost report
    const report = await Cost.aggregate([
      { $match: { user_id, year: parseInt(year), month: parseInt(month) } },
      {
        $group: {
          _id: '$category',
          costs: {
            $push: {
              day: '$day',
              description: '$description',
              sum: '$sum'
            }
          }
        }
      }
    ]);

    // Format the report into an object with category properties
    const formattedReport = {};
    report.forEach(item => {
      formattedReport[item._id] = item.costs;
    });

    // Add empty categories to the report
    const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];
    categories.forEach(category => {
      if (!formattedReport.hasOwnProperty(category)) {
        formattedReport[category] = [];
      }
    });

    // Save the report to the separate collection
    const newReport = new Report({
      user_id,
      year,
      month,
      report: formattedReport
    });
    await newReport.save();

    // Delete any existing reports that should include the newly added cost
    await Report.deleteMany({
      user_id,
      year: { $ne: parseInt(year) },
      month: { $ne: parseInt(month) }
    });

    // Return the report
    res.json(formattedReport);
  } catch (error) {
    console.error('Error getting report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
