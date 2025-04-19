const mongoose = require('mongoose');

const varietySchema = new mongoose.Schema({
  varietyName: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Variety', varietySchema);