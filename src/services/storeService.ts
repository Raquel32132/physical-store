import { Address } from "../models/addressModel";
import { Store, StoreProps } from "../models/storeModel"
import { getAddressByCep } from "./addressService";

interface storeDataProps {
  name: string;
  description?: string;
  phoneNumber: string;
  email?: string;
  openingHours: string;
  isStoreOpenNow: boolean;
  address: {
    postalCode: string;
    number: string;
    complement?: string;
  }
}

export const createStore = async (storeData: storeDataProps): Promise<StoreProps> => {

  const addressData = await getAddressByCep(storeData.address.postalCode);

  const completeAddress = new Address({
    street: addressData.logradouro,
    neighborhood: addressData.bairro,
    city: addressData.localidade,
    state: addressData.estado,
    postalCode: storeData.address.postalCode,
    number: storeData.address.number,
    complement: storeData.address?.complement
  });

  const store = new Store({ ...storeData, address: completeAddress });
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