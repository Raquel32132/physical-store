import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const db = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(db);
    console.log('Database connection successful!');
  } catch (err) {
    console.error('Database connection error: ', err);
    process.exit(1);
  }
}