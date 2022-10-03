const express = require('express');
const { authenticate } = require('../middleware/authentication');
const { register, login, logout, getUser } = require('../controllers/authController');
const router = express.Router();

router.get('/', authenticate, getUser);
router.get('/logout', logout);
router.post('/', login);
router.post('/register', register);

module.exports = router;
