const router = require('express').Router();
const SummitController = require('../controllers/SummitController');

router.get('/getAllSummit', SummitController.getSummit);
router.post('/getUploadSignatures', SummitController.getUploadSignatures);

router.post('/checkin', SummitController.checkin);

module.exports = router;
