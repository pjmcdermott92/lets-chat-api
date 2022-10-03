const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.authenticate = asyncHandler(async (req, res, next) => {
    const notAuthorized = new ErrorResponse('Not Authorized', 401);
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    };

    if (!token) return next(notAuthorized);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user);
        next();
    } catch (err) {
        return next(notAuthorized);
    }
});
