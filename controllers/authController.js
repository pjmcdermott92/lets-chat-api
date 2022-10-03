const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const sendToken = require('../utils/sendToken');

// POST /v1/auth/register    - Register a User
exports.register = asyncHandler(async (req, res, next) => {
    const { first_name, last_name, email, password, display_name } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return next(new ErrorResponse('Please provide all required fields'), 400);
    }

    const user = await User.create({
        display_name: display_name ? display_name : `${first_name.toLowerCase().trim()}.${last_name.toLowerCase().trim()}`,
        email: email.toLowerCase(),
        ...req.body
    });

    sendToken(user, 201, res);
});

// POST /v1/auth   - Log In a User
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorResponse('Please provide an Email address and Password', 400));

    const invalidCredentialsRes = new ErrorResponse('Invalid Credentials', 401);
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) return next(invalidCredentialsRes);
    const isValid = await user.checkPassword(password);
    if (!isValid) return next(invalidCredentialsRes);

    sendToken(user, 200, res);
});

// GET  /v1/auth/logout - Log Out User
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    });
    res.json({ success: true, data: {} });
});

// GET  /v1/auth    - Get current User
exports.getUser = asyncHandler(async (req, res, next) => {
    res.json({ success: true, data: req.user });
});
