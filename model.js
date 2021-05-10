const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  original: String,
  short: String,
});

module.exports = mongoose.model('URL', urlSchema);
