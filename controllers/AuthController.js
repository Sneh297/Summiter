const Achievement = require('../models/Achievement');
const User = require('../models/User');
const sendResponse = require('../utils/sendResponce');

exports.addUser = async (req, res) => {
  try {
    const { uid, email } = req.body;

    const user = await User.findOne({ $or: [{ uid }, { email }] });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a default empty achievement document
    const newAchievement = await Achievement.create({ achievements: [] });

    // Generate username from email
    const username = email.split('@')[0];

    // Create new user and associate achievement ID
    await User.create({
      uid,
      email,
      username,
      achievements: newAchievement._id, // Link Achievement
    });

    res
      .status(200)
      .json({ message: 'User and achievement created successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.changeName = async (req, res) => {
  const { uid, username } = req.body;

  const user = await User.findOne({ uid: uid });
  console.log(user);
  try {
    const user = await User.findOne({ uid: uid });
    if (!user) {
      return sendResponse(res, 'User not found', 404);
    }
    user.username = username;
    await user.save();
    sendResponse(res, 'Username updated successfully');
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};
