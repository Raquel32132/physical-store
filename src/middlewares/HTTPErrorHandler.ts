import { Request, Response, NextFunction } from 'express';
import { ERROR_TYPES, ERROR_MESSAGES, ErrorType } from '../constants/errors';

interface AppError {
  type: ErrorType;
  message: string;
}

const HTTPErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): Response => {
  console.error(err);

  let statusCode = 500;
  let message: string = ERROR_MESSAGES.INTERNAL;

  if (err.type === ERROR_TYPES.VALIDATION) {
    statusCode = 400;
    message = err.message || ERROR_MESSAGES.VALIDATION;
  } else if (err.type === ERROR_TYPES.NOT_FOUND) {
      statusCode = 404;
      message = err.message || ERROR_MESSAGES.NOT_FOUND;
  } else if (err.type === ERROR_TYPES.DATABASE) {
      statusCode = 500;
      message = err.message || 'Database operation failed';
  }

  return res.status(statusCode).json({
    status: statusCode === 500 ? 'error' : 'fail',
    message
  });
};