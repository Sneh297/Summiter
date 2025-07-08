const User = require('../models/User');
const sendResponse = require('../utils/sendResponce');

exports.addUser = async (req, res) => {
  const { uid, email } = req.body;

  const user = await User.findOne({ $or: [{ uid: uid }, { email: email }] });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const username = email.split('@')[0];
  await User.create({ uid, email, username });
  res.status(200).json({ message: 'User added successfully' });
};

exports.changeName = async (req, res) => {
  const { uid, username } = req.body;
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
