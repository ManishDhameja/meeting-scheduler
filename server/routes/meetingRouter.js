const express = require('express');

const router = express.Router();

const meetingController = require('../controllers/meetingController');

router.post('/deleteMeeting', meetingController.deleteMeeting);

module.exports = router; 