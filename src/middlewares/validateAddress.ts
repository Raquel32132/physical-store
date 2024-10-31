import axios from 'axios';
import { ERROR_TYPES } from '../constants/errors';

export const validatePostalCodeFuntion = async (postalCode: string) => {
  const postalCodePattern = /^\d{5}-\d{3}$/;

  if (!postalCode) {
    throw {
      type: ERROR_TYPES.REQUIRED_FIELD,
      message: 'Postal code is required.'
    };
  }

  if (!postalCodePattern.test(postalCode)) {
    throw {
      type: ERROR_TYPES.VALIDATION,
      message: 'Invalid postal code format.'
    };
  }

  const response = await axios.get(`${process.env.VIA_CEP_URL}/${postalCode}/json/`);

  if (response.data && response.data.erro) {
    throw {
      type: ERROR_TYPES.NOT_FOUND,
      message: 'Postal code does not exist.'
    };
  }

  return null;
};