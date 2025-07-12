const Summits = require('../models/Summits');
const sendResponse = require('../utils/sendResponce');
const cloudinary = require('../config/cloudinary');
const User = require('../models/User');
const Achievement = require('../models/Achievement');

exports.getSummit = async (req, res) => {
  try {
    const allSummits = await Summits.find();
    return sendResponse(
      res,
      200,
      true,
      'Summits retrieved successfully',
      allSummits
    );
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

exports.checkin = async (req, res) => {
  const { uid, certificate, selfie, mountainName, date } = req.body;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const achievement = await Achievement.findOne({ _id: user.achievements });
    if (!achievement) {
      return sendResponse(res, 404, false, 'Achievement not found');
    }

    achievement.achievements.push({ certificate, selfie, mountainName, date });
    await achievement.save();

    return sendResponse(res, 200, true, 'Checkin successful');
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

exports.getUploadSignatures = async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const timestamp1 = Math.floor(Date.now() / 1000);
    const timestamp2 = timestamp1 + 1; // ensure different timestamp for 2nd signature
    const folder = 'uploads';

    const signature1 = cloudinary.utils.api_sign_request(
      { timestamp: timestamp1, folder },
      process.env.CLOUDINARY_API_SECRET
    );

    const signature2 = cloudinary.utils.api_sign_request(
      { timestamp: timestamp2, folder },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      uploads: [
        {
          timestamp: timestamp1,
          signature: signature1,
          folder,
        },
        {
          timestamp: timestamp2,
          signature: signature2,
          folder,
        },
      ],
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
