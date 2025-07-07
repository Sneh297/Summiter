const mongoose = require('mongoose');

const mountainPeakSchema = new mongoose.Schema({
  id: Number,
  name: String,
  normalizedName: String,
  latitude: Number,
  longitude: Number,
  elevation: Number,
  state: String,
});

const Summits = mongoose.model('Summits', mountainPeakSchema);

module.exports = Summits;
