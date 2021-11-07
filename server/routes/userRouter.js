const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, userController.getUser);
router.post('/getMeetings', isAuth, userController.getMeetings);

module.exports = router; 


