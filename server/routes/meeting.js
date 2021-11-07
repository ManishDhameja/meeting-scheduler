const express = require('express');

const router = express.Router();

const meetingController = require('../controllers/meeting');

router.get('/getmeetings', meetingController.getmeetings);

module.exports = router; 