import axios from 'axios';
import { AddressProps } from '../models/addressModel';
import { calculateHaversineDistance } from '../utils/calculateHaversineDistance';
import { StoreProps } from '../models/storeModel';

export const getAddressByPostalCode = async (cep: string): Promise<any> => {
  const url = `${process.env.VIA_CEP_URL}/${cep}/json/`;

  try {
    const response = await axios.get<AddressProps>(url);
    const address = response.data;

    return address;

  } catch (error) {
    throw new Error('Error searching for postal code.');
  }
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

export const findNearbyStores = async (
  postalCode: string,
  stores: Array<StoreProps>
): Promise<Array<{ name: string; distance: number }>> => {

  const addressData = await getAddressByPostalCode(postalCode);
  const formattedAddress = `${addressData.logradouro},${addressData.uf},${addressData.localidade}`;

  const userCoordinates = await getCoordinates(formattedAddress);

  const nearbyStores = stores.map(store => ({
    name: store.name,
    distance: calculateHaversineDistance(userCoordinates.latitude, userCoordinates.longitude, store.address.latitude, store.address.longitude)
  }))
  .filter(store => store.distance <= 100)
  .sort((a, b) => a.distance = b.distance);

  return nearbyStores;
}