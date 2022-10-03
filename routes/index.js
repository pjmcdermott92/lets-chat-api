const express = require('express');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/rooms', authenticate, require('./room'));

module.exports = router;
