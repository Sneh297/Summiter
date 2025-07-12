const router = require('express').Router();

const AchievementController = require('../controllers/AchievementController');

router.get('/getAchievements', AchievementController.getAchievements);
module.exports = router;
