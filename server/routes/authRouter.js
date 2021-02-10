const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/create_pw', authController.createPassword, authController.storeUserInfo, (req, res) => res.status(200).json(res.locals.result));

router.post('/check_pw', authController.checkPassword, (req, res) => res.status(200).json(res.locals.result));

module.exports = router;