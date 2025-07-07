const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/checkin', UserController.checkin);

module.exports = router;
