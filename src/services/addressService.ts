import axios from 'axios';
import { ERROR_TYPES } from '../constants/errors';
import { StoreProps } from '../models/storeModel';
import { AddressProps } from '../models/addressModel';
import { calculateHaversineDistance } from '../utils/calculateHaversineDistance';
import { validatePostalCode } from '../utils/validatePostalCode';

export const getAddressByPostalCode = async (postalCode: string): Promise<any> => {
  const url = `${process.env.VIA_CEP_URL}/${postalCode}/json/`;

    const response = await axios.get<AddressProps>(url);
    const address = response.data;

    if (!postalCode) {
      throw {
        type: ERROR_TYPES.NOT_FOUND,
        message: 'Error searching for postal code.'
      }
    }

    return address;
}

export const getCoordinates = async (address: string): Promise<{ latitude: number; longitude: number}> => {
  const formattedAddress = address.replace(/ /g, '+');
  const url = `${process.env.OPENCAGE_URL}?q=${encodeURIComponent(formattedAddress)}&key=${process.env.OPENCAGE_API_KEY}`;

  const response = await axios.get(url);
  const { lat, lng } = response.data.results[0].geometry;

  if (!lat || !lng) {
    throw {
      type: ERROR_TYPES.NOT_FOUND,
      message: 'Error searching for coordinates.'
    }
  }

  return { latitude: lat, longitude: lng };
}

export const findNearbyStores = async (
  postalCode: string,
  stores: Array<StoreProps>,
  maxDistance: number
): Promise<Array<StoreProps & { distance: number }>> => {
  await validatePostalCode(postalCode);
  const addressData = await getAddressByPostalCode(postalCode);
  const formattedAddress = `${addressData.logradouro},${addressData.uf},${addressData.localidade}`;

  const userCoordinates = await getCoordinates(formattedAddress);

  const nearbyStores = stores.map(store => {
    const distance = calculateHaversineDistance(
      userCoordinates.latitude,
      userCoordinates.longitude,
      store.address.latitude,
      store.address.longitude
    );

    return {
      ...store.toObject(),
      distance: parseFloat(distance.toFixed(3)) 
    };
  })
  .filter(store => store.distance <= maxDistance)
  .sort((a, b) => a.distance - b.distance);

  return nearbyStores;
};
