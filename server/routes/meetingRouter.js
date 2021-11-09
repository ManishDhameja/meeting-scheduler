const express = require('express');

const router = express.Router();

const meetingController = require('../controllers/meetingController');

router.post('/deleteMeeting', meetingController.deleteMeeting);
router.post('/createMeeting', meetingController.createMeeting);
router.put('/acceptMeeting', meetingController.acceptMeeting);
router.put('/declineMeeting', meetingController.declineMeeting);
router.get('/upcomingMeetings', meetingController.upcomingMeetings);

module.exports = router; 