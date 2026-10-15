import config from '../config/index.js';

export class AppError extends Error {
  constructor(message, statusCode = 500, details = null, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.details = details;
    this.code = code || (statusCode === 400 ? 'BAD_REQUEST' : statusCode === 404 ? 'NOT_FOUND' : statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, details = null, code = 'BAD_REQUEST') {
    return new AppError(message, 400, details, code);
  }

  static notFound(message = 'Resource not found', details = null, code = 'NOT_FOUND') {
    return new AppError(message, 404, details, code);
  }

  static unauthorized(message = 'Unauthorized access', details = null, code = 'UNAUTHORIZED') {
    return new AppError(message, 401, details, code);
  }

  static internal(message = 'Internal server error', details = null, code = 'INTERNAL_ERROR') {
    return new AppError(message, 500, details, code);
  }
}

export const notFoundHandler = (req, res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl} - Route not found`, 404));
};

export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  let statusCode = err.statusCode || 500;
  let message = err.message || 'An unexpected error occurred';
  let details = err.details || null;
  let errorCode = err.code || 'INTERNAL_ERROR';

  // Handle Axios / external HTTP errors (e.g. TinyFish API)
  if (err.isAxiosError) {
    errorCode = 'EXTERNAL_API_ERROR';
    if (err.response) {
      statusCode = err.response.status >= 500 ? 502 : err.response.status;
      message = `External service error: ${err.response.data?.message || err.response.statusText || err.message}`;
      details = {
        status: err.response.status,
        data: err.response.data,
        url: err.config?.url
      };
    } else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
      statusCode = 504;
      message = 'External service request timed out';
      errorCode = 'EXTERNAL_TIMEOUT';
    } else {
      statusCode = 503;
      message = `Failed to connect to external service: ${err.message}`;
      errorCode = 'SERVICE_UNAVAILABLE';
    }
  }

  // Handle Express body-parser JSON syntax errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Malformed JSON payload in request body';
    errorCode = 'INVALID_JSON';
  }

  // Log in development or if 500
  if (!config.isProduction || statusCode >= 500) {
    console.error(`[Error] ${req.method} ${req.originalUrl} -> ${statusCode}: ${message}`);
    if (err.stack && (!config.isProduction || statusCode >= 500)) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: errorCode,
      details,
      ...(config.nodeEnv === 'development' ? { stack: err.stack } : {})
    }
  });
};

export default { AppError, notFoundHandler, errorHandler };
