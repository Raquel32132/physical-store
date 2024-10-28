import axios from 'axios';
import { AddressProps } from '../models/addressModel';

export const getAddressByCep = async (cep: string): Promise<any> => {
  const url = `${process.env.VIA_CEP_URL}/${cep}/json/`;

  try {
    const response = await axios.get<AddressProps>(url);
    const address = response.data;

    return address;

  } catch (error) {
    throw new Error('Erro ao buscar CEP.');
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
    throw new Error('Erro ao buscar coordenadas.')
  }
}