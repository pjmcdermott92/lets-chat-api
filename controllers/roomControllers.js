const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Room = require('../models/Room');

// GET  /v1/rooms   - Get all rooms
exports.getRooms = asyncHandler(async (req, res, next) => {
    const rooms = await Room.find({});

    res.json({ success: true, data: rooms });
});

// POST /v1/rooms   - Add a room
exports.addRoom = asyncHandler(async(req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) return next(new ErrorResponse('Please provide all required information', 400));

    const roomSlug = name.trim().toLowerCase().split(' ').join('-');
    const room = await Room.create({
        name: roomSlug,
        description,
        user: req.user._id
    });

    res.status(201).json({ success: true, data: room });
});
