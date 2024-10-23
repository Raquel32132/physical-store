import { Store, StoreProps } from "../models/storeModel"

export const createStore = async (storeData: StoreProps): Promise<StoreProps> => {
  const store = new Store(storeData);
  await store.save();
  return store;
};

export const getAllStores = async (): Promise<StoreProps[]> => {
  return Store.find().populate('address');
};

export const getStoreById = async (id: string): Promise<StoreProps | null> => {
  return Store.findById(id).populate('address');
}