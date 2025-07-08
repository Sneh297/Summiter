const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema([
  {
    image: {
      type: String,
      required: true,
    },
    selfie: {
      type: String,
      required: true,
    },
    mountainName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
]);

module.exports = mongoose.model('Achievement', achievementSchema);
