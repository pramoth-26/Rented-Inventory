// models/Issue.js
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  issueDateTime: { type: Date, default: Date.now },

});

issueSchema.pre('save', function (next) {
  this.issueDateTime = new Date(); // Updates to current date & time
  next();
});

module.exports = mongoose.model('Issue', issueSchema);