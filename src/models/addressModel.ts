import { kMaxLength } from 'buffer';
import mongoose, { Schema, Document } from 'mongoose';

export interface AddressProps extends Document {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const addressSchema: Schema = new Schema({
  street: { 
    type: String, 
    minLength: [1, 'Street should have at least one character.'], 
    maxLength: [100, 'Street should not exceed 100 characters.'],
    required: [true, 'Street is required.']  
  },
  number: { 
    type: String,
    minLength: [1, 'Number should have at least one character.'], 
    maxLength: [10, 'Number should not exceed 10 characters.'], 
    required: [true, 'Number is required.']  
  },
  complement: { 
    type: String,
    maxLength: [50, 'Complement should not exceed 50 characters.'], 
  },
  neighborhood: { 
    type: String,
    minLength: [1, 'Neighborhood should have at least one character.'], 
    maxLength: [100, 'Neighborhood should not exceed 100 characters.'], 
    required: [true, 'Neighborhood is required.']  
  },
  city: { 
    type: String,
    minLength: [1, 'City should have at least one character.'], 
    maxLength: [100, 'City should not exceed 100 characters.'], 
    required: [true, 'City is required.']  
  },
  state: { 
    type: String,
    minLength: [1, 'State should have at least one character.'], 
    maxLength: [100, 'State should not exceed 100 characters.'], 
    required: [true, 'State is required.']  
  },
  postalCode: { 
    type: String,
    match: [/^\d{5}-\d{3}$/, 'The postal code should follow the format 12345-678.'], 
    required: [true, 'Postal code is required.'] 
  },
  country: { 
    type: String, 
    minLength: [1, 'Country should have at least one character.'], 
    maxLength: [100, 'Country should not exceed 100 characters.'], 
    required: [true, 'Country is required.']  
  },
  latitude: { 
    type: Number, 
    min: [-90, 'Latitude must be at least -90 degrees.'],
    max: [90, 'Latitude cannot exceed 90 degrees.'],
    required: [true, 'Latitude is required.']  
  },
  longitude: { 
    type: Number,
    min: [-180, 'Longitude must be at least -180 degrees.'],
    max: [180, 'Longitude cannot exceed 180 degrees.'], 
    required: [true, 'Longitude is required.']  
  }
});

export const Address = mongoose.model<AddressProps>('Address', addressSchema);