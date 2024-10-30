import mongoose, { Schema, Document } from 'mongoose';
import { addressSchema, AddressProps } from './addressModel';
import { timeStamp } from 'console';

export interface StoreProps extends Document {
  name: string;
  description?: string;
  phoneNumber: string;
  email?: string;
  openingHours: string;
  address: AddressProps;
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Store name is required.'],
    minLength: [1, 'Store name should have at least one character.'],
    maxLength: [100, 'Store name should not exceed 100 characters.'] 
  },
  description: { 
    type: String,
    maxLength: [200, 'Store description should not exceed 200 characters.']
  },
  phoneNumber: { 
    type: String, 
    required: [true, 'Phone number is required.'],
    match: [/^\(?\d{2}\)?[\s-]?[\d\s-]{8,9}$/, 'Phone number must be in a valid format.']
  },
  email: { 
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Email must be in a valid format.'] 
  },
  openingHours: { 
    type: String, 
    required: [true, 'Opening hours is required.'],
    match: [/^\d{1,2}:\d{2}\s?-\s?\d{1,2}:\d{2}$/, 'Opening hours must be in the format HH:MM - HH:MM.']
  },
  address: { 
    type: addressSchema, 
    required: [true, 'Address is required.'] 
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

export const Store = mongoose.model<StoreProps>('Store', storeSchema);
