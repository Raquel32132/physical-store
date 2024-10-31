import { Request, Response, NextFunction } from 'express';
import { ERROR_TYPES } from '../constants/errors';

const allowedFields = [
  'name',
  'description',
  'phoneNumber',
  'email',
  'openingHours',
  'isStoreOpenNow',
  'address'
]

export const validateStorePayload = (req: Request, res: Response, next: NextFunction) => {
  const payloadKeys = Object.keys(req.body);

  const invalidKeys = payloadKeys.filter(key => !allowedFields.includes(key));

  if (invalidKeys.length > 0) {
    const error = {
      type: ERROR_TYPES.INVALID_DATA,
      message: `Invalid fields: ${invalidKeys.join(', ')}. Allowed fields are: ${allowedFields.join(', ')}`
    }
    return next(error);
  }

  if (req.body.address) {
    const addressFields = ['postalCode', 'number', 'complement'];
    const addressKeys = Object.keys(req.body.address);
    
    const invalidAddressKeys = addressKeys.filter(key => !addressFields.includes(key));

    if (invalidAddressKeys.length > 0) {
      const error = {
        type: ERROR_TYPES.INVALID_DATA,
        message: `Invalid fields in address: ${invalidAddressKeys.join(', ')}. Allowed fields are: ${addressFields.join(', ')}`
      }
      return next(error);
    }
  }

  next();
}