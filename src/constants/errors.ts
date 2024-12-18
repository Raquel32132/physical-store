export const ERROR_TYPES = {
  VALIDATION: 'ValidationError',
  NOT_FOUND: 'NotFoundError',
  DATABASE: 'DatabaseError',
  REQUIRED_FIELD: 'RequiredFieldError',
  INVALID_DATA: 'InvalidDataError',
  REQUEST: 'RequestError',
  INVALID_ID: 'NotFoundIDError'
} as const;

export const ERROR_MESSAGES = {
  VALIDATION: 'Validation error',
  NOT_FOUND: 'Resource not found',
  INTERNAL:  'Internal server error',
  REQUIRED_FIELD: 'Required field missing',
  INVALID_DATA: 'Invalid data provided',
  REQUEST: 'Request error', 
  INVALID_ID: 'Not Found ID'
} as const;

export type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];
