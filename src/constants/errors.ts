export const ERROR_TYPES = {
  VALIDATION: 'ValidationError',
  NOT_FOUND: 'NotFoundError',
  DATABASE: 'DatabaseError'
} as const;

export const ERROR_MESSAGES = {
  VALIDATION: 'Validation error',
  NOT_FOUND: 'Resource not found',
  INTERNAL:  'Internal server error'
} as const;

export type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];
