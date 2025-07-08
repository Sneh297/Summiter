const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
