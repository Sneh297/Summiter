const Achievement = require('../models/Achievement');
const User = require('../models/User');
const sendResponse = require('../utils/sendResponce');

exports.getAchievements = async (req, res) => {
  const { uid } = req.query;

  try {
    console.log(uid);
    const user = await User.findOne({ uid });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const achievement = await Achievement.findOne({ _id: user.achievements });
    if (!achievement) {
      return sendResponse(res, 404, false, 'Achievement not found');
    }

    return sendResponse(
      res,
      200,
      true,
      'Achievements retrieved successfully',
      achievement.achievements
    );
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
