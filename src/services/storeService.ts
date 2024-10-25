import { Address } from "../models/addressModel";
import { Store, StoreProps } from "../models/storeModel"
import { getAddressByCep } from "./addressService";

export const createStore = async (storeData: any): Promise<StoreProps> => {
  const store = new Store({ ...storeData });
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