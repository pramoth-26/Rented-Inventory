// models/Details.js
const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  name: String,
  mobileNo: String,
  itemName: String,
  quantity: Number,
  status: { type: String, enum: ['issued', 'received'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Details', detailsSchema);
