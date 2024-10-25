import mongoose, { Schema, Document } from 'mongoose';

export interface AddressProps extends Document {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
}

export const addressSchema: Schema = new Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
});

export const Address = mongoose.model<AddressProps>('Address', addressSchema);