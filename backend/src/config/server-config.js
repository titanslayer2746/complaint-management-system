import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
dotenv.config();


export const PORT=process.env.PORT;
export const MONGODB_URI=process.env.MONGODB_URI;
export const JWT_SECRET=process.env.JWT_SECRET;
export const ADMIN_SECRET=process.env.ADMIN_SECRET;
export const EMAIL_USER=process.env.EMAIL_USER;
export const EMAIL_PASS=process.env.EMAIL_PASS;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
