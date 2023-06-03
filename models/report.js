// Project Team:
// - Sergey Artemeive (ID: 320689789)
// - Ohad Yael (ID: 208544866)
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user_id: String,
  year: Number,
  month: Number,
  report: Object
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
