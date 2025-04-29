import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import   cloudinary  from "../Config/cloudinary";

// Configuration du stockage Cloudinary avec Multer
const storage = new CloudinaryStorage({
  cloudinary, // Instance Cloudinary correctement configurée
  params: async (req, file) => {
    console.log("Fichier reçu :", file); // Vérifier l'objet `file`
    const format = file.mimetype.split("/")[1]; // Récupère le format (png, jpeg, etc.)
    const fileName = file.originalname.split(".").slice(0, -1).join("."); // Évite les erreurs de fichiers avec plusieurs points

    return {
      folder: "users_profiles", // Dossier de stockage sur Cloudinary
      format: format, // Détermine le format du fichier
      public_id: fileName, // Nom du fichier sans l'extension
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Redimensionnement
    };
  },
});

// Middleware Multer pour gérer l'upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "image"));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // ⏳ Limite de 5 Mo
});

export default upload; // Exporte `upload` pour l'utiliser dans les routes