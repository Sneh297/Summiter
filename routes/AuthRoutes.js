const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

router.post('/addUser', AuthController.addUser);
router.put('/changeName', AuthController.changeName);

module.exports = router;
