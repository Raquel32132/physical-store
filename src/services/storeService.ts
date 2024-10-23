import { Store, StoreProps } from "../models/storeModel"

export const createStore = async (storeData: StoreProps): Promise<StoreProps> => {
  const store = new Store(storeData);
  await store.save();
  return store;
};