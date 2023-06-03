// Project Team:
// - Sergey Artemeive (ID: 320689789)
// - Ohad Yael (ID: 208544866)
const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
  user_id: String,
  year: Number,
  month: Number,
  day: Number,
  description: String,
  category: String,
  sum: Number
});

const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
