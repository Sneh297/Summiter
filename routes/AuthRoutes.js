const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

router.get('/sign-up', AuthController.signUp);

module.exports = router;
