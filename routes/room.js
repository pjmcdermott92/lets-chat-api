const express = require('express');
const { getRooms, addRoom } = require('../controllers/roomControllers');
const router = express.Router();

router.route('/')
    .get(getRooms)
    .post(addRoom)

module.exports = router;
