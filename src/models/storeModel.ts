import { Address } from './Address';

export interface Store {
  id: string;
  name: string;
  description?: string;
  phoneNumber: string;
  email?: string;
  openingHours: string;
  isStoreOpenNow: boolean;
  address: Address;
}