import axios from 'axios';
import { AddressProps } from '../models/addressModel';
import { calculateHaversineDistance } from '../utils/calculateHaversineDistance';
import { StoreProps } from '../models/storeModel';
import { ERROR_TYPES } from '../constants/errors';

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

  try {
    const response = await axios.get(url);
    const { lat, lng } = response.data.results[0].geometry;

    return { latitude: lat, longitude: lng };
    
  } catch (error) {
    throw new Error('Error searching for coordinates.')
  }
}

export const findNearbyStores = async ( //refatorar, esta como uma função muito especifica, ao inves de buscar lojas, buscar endereços e parametrizar as entradas
  postalCode: string,
  stores: Array<StoreProps>
): Promise<Array<{ name: string; distance: number }>> => {

  const addressData = await getAddressByPostalCode(postalCode);
  const formattedAddress = `${addressData.logradouro},${addressData.uf},${addressData.localidade}`;

  const userCoordinates = await getCoordinates(formattedAddress);

  const nearbyStores = stores.map(store => {

    const distance = calculateHaversineDistance(userCoordinates.latitude, userCoordinates.longitude, store.address.latitude, store.address.longitude);

    return {
      name: store.name,
      distance: parseFloat(distance.toFixed(3))
    }
  })
  .filter(store => store.distance <= 100)
  .sort((a, b) => a.distance - b.distance);

  return nearbyStores;
}