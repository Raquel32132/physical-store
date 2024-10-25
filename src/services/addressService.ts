import axios from 'axios';
import { AddressProps } from '../models/addressModel';

export const getAddressByCep = async (cep: string): Promise<any> => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await axios.get<AddressProps>(url);
    const address = response.data;

    console.log(address);

  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
}