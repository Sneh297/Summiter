const Summits = require('../models/Summits');
const sendResponse = require('../utils/sendResponce');

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
