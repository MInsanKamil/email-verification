const express = require('express');
const { register, login, verify, resendVerification } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verify);
router.post('/resend-verification', resendVerification);

module.exports = router;
