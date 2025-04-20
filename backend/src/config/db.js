import mongoose from 'mongoose';
import { MONGODB_URI } from './server-config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('DB connected successfully');

  } catch (error) {
    console.log('Something went wrong in connecting to DB', error);
  }
};
