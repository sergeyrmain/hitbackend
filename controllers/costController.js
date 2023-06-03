const Cost = require('../models/cost');
const Report = require('../models/report');

exports.addCost = async (req, res) => {
  const { user_id, year, month, day, description, category, sum } = req.body;

  // Validate input
  if (!user_id || !year || !month || !day || !description || !category || !sum) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new cost item
    const cost = new Cost({
      user_id,
      year,
      month,
      day,
      description,
      category,
      sum
    });

    // Save the cost item to the database
    await cost.save();

    // Delete the existing report if it exists
    await Report.findOneAndDelete({ user_id, year, month });

    // Return the added cost item
    res.json(cost);
  } catch (error) {
    console.error('Error adding cost:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
