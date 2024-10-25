import { Address } from "../models/addressModel";
import { Store, StoreProps } from "../models/storeModel"
import { getAddressByCep } from "./addressService";

export const createStore = async (storeData: any): Promise<StoreProps> => {
  const { cep, number, complement } = storeData;
  const addressData = await getAddressByCep(cep);

  const completeAddress = new Address({
    street: addressData.logradouro,
    neighborhood: addressData.bairro,
    city: addressData.localidade,
    state: addressData.uf,
    postalCode: cep,
    number: number,
    complement: complement || ''
  });
  await completeAddress.save();

  const store = new Store({ ...storeData, address: completeAddress._id });
  await store.save();
  return store;
};

export const getAllStores = async (): Promise<StoreProps[]> => {
  return Store.find().populate('address');
};

export const getStoreById = async (id: string): Promise<StoreProps | null> => {
  return Store.findById(id).populate('address');
}

export const updateStore = async (id: string, updateData: Partial<StoreProps>): Promise<StoreProps | null> => {
  return Store.findByIdAndUpdate(id, updateData, { new: true }).populate('address');
}

export const deleteStore = async (id: string): Promise<StoreProps | null> => {
  return Store.findByIdAndDelete(id);
}