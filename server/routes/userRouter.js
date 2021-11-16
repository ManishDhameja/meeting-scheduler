const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const isAuth = require('../middlewares/is-auth');

router.get('/', userController.getUser);
router.post('/getMeetings', userController.getMeetings);
// router.post('/getUpcomingAcceptedMeetings', userController.getUpcomingAcceptedMeeting);
router.post('/addWorkingHours', userController.addWorkingHours);

module.exports = router; 


 