import mongoose, { Schema, Document } from 'mongoose';
import { AddressProps } from './addressModel';

interface StoreProps extends Document {
  name: string;
  description?: string;
  phoneNumber: string;
  email?: string;
  openingHours: string;
  isStoreOpenNow: boolean;
  address: AddressProps;
}

const storeSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  openingHours: { type: String, required: true },
  isStoreOpenNow: { type: Boolean, required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address', required: true }
});

export const Store = mongoose.model<StoreProps>('Store', storeSchema);
