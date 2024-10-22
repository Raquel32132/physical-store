import mongoose, { Schema, Document } from 'mongoose';

interface AddressProps extends Document {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const addressSchema: Schema = new Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String, required: false },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

export const Address = mongoose.model<AddressProps>('Address', addressSchema);