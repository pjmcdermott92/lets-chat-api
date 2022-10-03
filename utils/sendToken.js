const sendToken = (user, statusCode, res) => {
    const token = user.getJWT();
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') options.secure = true;

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        data: token
    });
}

module.exports = sendToken;
