const router = require('express').Router();
const SummitController = require('../controllers/SummitController');

router.get('/getAllSummit', SummitController.getSummit);

module.exports = router;
