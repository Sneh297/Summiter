const Summits = require('../models/Summits');
exports.getSummit = async (req, res) => {
  try {
    const allSummits = await Summits.find();
    res.status(200).json(allSummits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
