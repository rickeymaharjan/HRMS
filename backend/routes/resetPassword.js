const express = require('express');
const router = express.Router();
const { initiateResetPassword, resetPassword } = require('../controllers/resetPasswordController');

router.post('/reset-password', initiateResetPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
