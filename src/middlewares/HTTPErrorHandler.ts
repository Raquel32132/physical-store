import { Request, Response, NextFunction } from 'express';
import { ERROR_TYPES, ERROR_MESSAGES, ErrorType } from '../constants/errors';

interface AppError {
  type: ErrorType;
  message: string;
}

export const HTTPErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
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
  } else if (err.type === ERROR_TYPES.REQUIRED_FIELD) {
    statusCode = 400;
    message = err.message || ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (err.type === ERROR_TYPES.INVALID_DATA) {
    statusCode = 400;
    message = err.message || ERROR_MESSAGES.INVALID_DATA;
  }

  res.status(statusCode).json({
    status: statusCode === 500 ? 'error' : 'fail',
    message
  });
};