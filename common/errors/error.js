import logger from '../config/logger.config';

class ErrorHandler extends Error {
		constructor(statusCode, message) {
				super(message);

				this.statusCode = statusCode;
				this.status = `${ statusCode }`.startsWith('4') ? 'fail' : 'error';
				this.isOperational = true;

				Error.captureStackTrace(this, this.constructor);
		}
}

const catchAsync = fn => (req, res, next) => {
		fn(req, res, next).catch(next);
};

const handleError = (err, req, res, next) => {
		const {
				statusCode = 500,
				message = 'Internal server error',
				status = 'error'
		} = err;
		res.status(statusCode).json({
				status,
				statusCode,
				message
		});
};

const logError = (err, req, res, next) => {
		logger.error(`${ err.name }: ${ err.message }`);
		next(err);
};

export {
		ErrorHandler,
		handleError,
		logError,
		catchAsync
};