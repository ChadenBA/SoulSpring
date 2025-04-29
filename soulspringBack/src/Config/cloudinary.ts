import { v2 as cloudinary } from "cloudinary"; //assure ql'utilisation de la bonne version du SDK Cloudinary.
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;