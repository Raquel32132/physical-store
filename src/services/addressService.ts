import fetch from "node-fetch";

export const getAddressByCep = async (cep: string): Promise<any> => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(url);
  const address = await response.json();

  if (!address) {
    throw new Error('CEP inválido.');
  }

  return address
}