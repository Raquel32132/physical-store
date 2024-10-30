import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const validatePostalCode = async (req: Request, res: Response, next: NextFunction) => {
  const postalCode = req.body.address.postalCode;
  const postalCodePattern = /^\d{5}-\d{3}$/;

  if (!postalCodePattern.test(postalCode)) {
    const error = new Error('Invalid postal code format.');
    res.status(400);
    return next(error);
  }

  try {
    const response = await axios.get(`${process.env.VIA_CEP_URL}/${postalCode}/json/`);

    if (response.data && response.data.erro) {
      const error = new Error('Postal code does not exist.');
      res.status(400);
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};