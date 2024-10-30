import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { ERROR_TYPES } from '../constants/errors';

export const validatePostalCode = async (req: Request, res: Response, next: NextFunction) => {
  const postalCode = req.body.address.postalCode;
  const postalCodePattern = /^\d{5}-\d{3}$/;

  if (!postalCode) {
    const error = {
      type: ERROR_TYPES.REQUIRED_FIELD,
      message: 'Postal code is required.'
    }
    return next(error);
  }

  if (!postalCodePattern.test(postalCode)) {
    const error = {
      type: ERROR_TYPES.VALIDATION,
      message: 'Invalid postal code format.'
    }
    return next(error);
  }

  try {
    const response = await axios.get(`${process.env.VIA_CEP_URL}/${postalCode}/json/`);

    if (response.data && response.data.erro) {
      const error = {
        type: ERROR_TYPES.NOT_FOUND,
        message: 'Postal code does not exist.'
      }
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};