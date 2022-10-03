const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        message = 'Resource not found';
        error = new ErrorResponse(message, 404);
    }

    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(value => value.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    });
}

module.exports = errorHandler;
