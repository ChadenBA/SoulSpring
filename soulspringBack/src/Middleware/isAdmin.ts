import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../Models/AdminModel"; // Assure-toi d'importer ton modèle

export const isAdmin = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    // Vérifier si le token est fourni dans l'authorization header
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    // Vérifier que JWT_SECRET est bien défini
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Erreur serveur: JWT_SECRET non défini" });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; role: string };

    // Vérifier si l'utilisateur est un admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Accès interdit, vous devez être administrateur" });
    }

    // Vérifier si l'utilisateur existe dans la base de données
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: "Administrateur non trouvé" });

    }
    console.log(" L'utilisateur est admin, accès autorisé");
    next(); //  Ajout de next() pour continuer l'éxécution de la requête sinon : si next() n'éxiste pas il bloque la route
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
//auth: utilisé aprés le login pour verifier que l'utilisateur est connécter à chaque requete
// Vérifier que la requête contient un token JWT valide.
//==>Vérifier que l'utilisateur est connecté (quel que soit son rôle). 

//isAdmin : vérifie si l'utilisateur a le rôle admin, après avoir été authentifié.
//==> Vérifier que l'utilisateur est connecté ET qu'il est administrateur.

//login: connexion de l'utilisateur en utilisant son émail et son password 
//Générer et retourner un token JWT si l'utilisateur est valide.
//Ce token sera utilisé pour authentifier l'utilisateur dans les prochaines requêtes.
