export function notFoundError(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

export function internalError(err, req, res, next) {
    const error = {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
    };

    res.status(error.status).json({
        error: {
            message: error.message,
        }
    });
};