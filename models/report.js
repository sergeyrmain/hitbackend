const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user_id: String,
  year: Number,
  month: Number,
  report: Object
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
