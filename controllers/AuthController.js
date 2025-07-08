const { messaging } = require('firebase-admin');
const Achievement = require('../models/Achievement');
const User = require('../models/User');
const sendResponse = require('../utils/sendResponce');

exports.addUser = async (req, res) => {
  try {
    const { uid, email } = req.body;

    const user = await User.findOne({ $or: [{ uid }, { email }] });

    if (user) {
      return sendResponse(res, 400, false, 'User already exists');
    }

    // Create a default empty achievement document
    const newAchievement = await Achievement.create({ achievements: [] });

    // Generate username from email
    const username = email.split('@')[0];

    // Create new user and associate achievement ID
    const newUser = await User.create({
      uid,
      email,
      username,
      achievements: newAchievement._id, // Link Achievement
    });

    return sendResponse(
      res,
      200,
      true,
      'User and achievement created successfully'
    );
  } catch (error) {
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

exports.changeName = async (req, res) => {
  const { uid, username } = req.body;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    user.username = username;
    await user.save();

    return sendResponse(res, 200, true, 'Username updated successfully');
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
