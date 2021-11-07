const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const isAuth = require('../middlewares/is-auth');

router.get('/', userController.getUser);

module.exports = router; 


