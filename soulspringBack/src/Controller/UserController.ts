import { Request, Response, NextFunction } from "express";
import { User } from "../Models/UsersModel";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IProfessional , Professional } from "../Models/professionalModel";
import { Admin } from "../Models/AdminModel";
import util from "util";

import { sendEmail } from "../Utils/email"; // Fonction pour envoyer des emails
import crypto from "crypto";
import { Model } from "mongoose";
import { last } from "lodash";





//faut que ajouter champs username
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    let profilePicture: { url: string; publicId: string | null } | null = null;


    console.log("Requête reçue, body:", req.body);
    console.log("file:", req.file);


    // Upload image if provided
    if (req.file) {
      try {
        console.log("Upload de l'image sur Cloudinary...");
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "users_profiles",
          resource_type: "image",
        });
        console.log("Image uploadée avec succès:", result.secure_url);

        profilePicture = {
          url: result.secure_url,
          publicId: result.public_id,
        };
      } catch (error) {
        console.error("Erreur lors de l'upload Cloudinary:", error);
        return res.status(500).json({ message: "Erreur serveur", error: "Erreur lors de l'upload de l'image" });
      }
    }
    // Extract and validate fields
    const { name, lastname, email, password, role, age, specialite, description, contact,address } = req.body;
    console.log("Données utilisateur reçues:", { name, lastname, email, role, age, specialite, description, contact,address });

    if (!name || !lastname || !email || !password || !role || !age) {
      return res.status(400).json({ message: "Champs manquants" });
    }

 // Vérification de la présence de JWT_SECRET
 if (!process.env.JWT_SECRET) {
  return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
}
    // Vérification de la présence de JWT_SECRET
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    const sanitizedRole = String(role).toLowerCase(); // Ensure role is a string


    if (sanitizedRole === "professional" && (!specialite || !description || !contact || !address)) {
      return res.status(400).json({ message: "Champs manquants pour le professionnel" });
    }

    // Check if email exists across all collections
    const userExists = await User.findOne({ email });
    const professionalExists = await Professional.findOne({ email });
    const adminExists = await Admin.findOne({ email });

    if (userExists || professionalExists || adminExists) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Mot de passe trop court (min. 8 caractères)" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // **Create and save the correct user type**
    let savedUser;
    await User.updateOne({ email }, { $set: { hasCompletedTest: false } });

    if (sanitizedRole === "user") {
      savedUser = new User({
        name,
        lastname,
        email,
        password: hashedPassword,
        role: sanitizedRole,
        age: Number(age), // Ensure correct type
        profilePicture,  // Store the URL string here
        hasCompletedTest: false, // Explicitly setting this
      });
      console.log("User before saving:", savedUser);

    } else if (sanitizedRole === "professional") {
      savedUser = new Professional({
        name,
        lastname,
        email,
        password: hashedPassword,
        role: sanitizedRole,
        age: Number(age),
        profilePicture,  // Store the URL string here
        specialite,
        description,
        contact,
        address,
        isApproved: false,
        isSuspended: false
      });
    } else if (sanitizedRole === "admin") {
      savedUser = new Admin({
        name,
        lastname,
        email,
        password: hashedPassword,
        role: sanitizedRole,
        age: Number(age),
        profilePicture,  // Store the URL string here

      });
    } else {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    await savedUser.save();
        console.log(`${sanitizedRole} créé avec succès:`, savedUser);
    await savedUser.save();
    console.log(`${sanitizedRole} créé avec succès:`, savedUser);


    await savedUser.save();
        console.log(`${sanitizedRole} créé avec succès:`, savedUser);
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ message: `${sanitizedRole} créé avec succès`,token, user: savedUser });
  
  } catch (err) {
    console.error("Erreur serveur:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};







export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { first_name, last_name, email, age, specialite, description,address, contact, password: newPassword } = req.body;
    const idUser = req.params.id;

    if (!idUser) {
      return res.status(400).json({ message: "ID utilisateur non fourni" });
    }

    // Récupérer le token depuis les headers
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Accès non autorisé, token manquant" });
    }
 // Find the user by ID across all collections (User, Professional, Admin)
    let userToUpdate: any = await User.findById(idUser);
    if (!userToUpdate) {
    userToUpdate = await Professional.findById(idUser);
    }
    if (!userToUpdate) {
    userToUpdate = await Admin.findById(idUser);
    }

    if (!userToUpdate) {
       return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe uniquement s'il est présent dans la requête
    if (newPassword) {
      if (newPassword.length < 8) {
        return res.status(400).json({ message: "Mot de passe trop court (min. 8 caractères)" });
      }
      userToUpdate.password = await bcrypt.hash(newPassword, 12); // Hacher et mettre à jour le mot de passe
    }

   
    // Si une image est envoyée, mettre à jour la photo de profil
    if (req.file) {
      console.log("📦 Image reçue (req.file) :", JSON.stringify(req.file, null, 2));
      let cloudinaryUpload;
      if (userToUpdate.profilePicture?.publicId) {
        const [deleteResult, uploadResult] = await Promise.all([ //promise.all : Supprime l'ancienne image et upload la nouvelle en parallèle pour éviter un délai inutile.
          cloudinary.uploader.destroy(userToUpdate.profilePicture.publicId),
          cloudinary.uploader.upload(req.file.path , {
            folder: "users_profiles",
            resource_type: "image",
          }),
        ]);
        cloudinaryUpload = uploadResult;
        console.log("📤 Résultat Cloudinary :", JSON.stringify(cloudinaryUpload, null, 2));

      } else {
        cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
          folder: "users_profiles",
          resource_type: "image",
        });
      }

      // Vérification de l'upload réussi
      if (!cloudinaryUpload || !cloudinaryUpload.secure_url) {
        return res.status(500).json({ message: "Échec du téléchargement de l'image" });
      }

      // Mettre à jour la photo de profil dans la base de données
      userToUpdate.profilePicture = {
        url: cloudinaryUpload.secure_url,
        publicId: cloudinaryUpload.public_id,
      };
    }

    // Update common fields
    userToUpdate.name = first_name || userToUpdate.name;
    userToUpdate.lastname = last_name || userToUpdate.lastname;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.age = age || userToUpdate.age;

    // Update fields specific to professionals
    if (userToUpdate.role === "professional") {
      const professionalUser = userToUpdate as IProfessional;  // Cast to IProfessional

      professionalUser.specialite = specialite || professionalUser.specialite;
      professionalUser.description = description || professionalUser.description;
      professionalUser.contact = contact || professionalUser.contact;
      professionalUser.address=address || professionalUser.address;
    }

    // Save the updated user
    await userToUpdate.save();

    // Respond with the updated user data
    return res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: {
        id: userToUpdate._id,
        name: userToUpdate.name,
        lastname: userToUpdate.lastname,
        email: userToUpdate.email,
        role: userToUpdate.role,
        age: userToUpdate.age,
        profilePicture: userToUpdate.profilePicture,
        ...(userToUpdate.role === "professional" && {
          specialite: (userToUpdate as IProfessional).specialite,
          description: (userToUpdate as IProfessional).description,
          contact: (userToUpdate as IProfessional).contact,
        }),
      },
    });

  } catch (error) {
    console.error("❌ Erreur dans updateUser :", util.inspect(error, { showHidden: false, depth: null, colors: true }));
    
    return res.status(500).json({
      message: "Erreur serveur",
      error: error instanceof Error ? error.message : JSON.stringify(error),
    });
  }}
;

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user: any = null;
    let isProfessional = false;

    // Check if user exists in different collections
    user = await User.findOne({ email }).lean();
    if (!user) {
      user = await Admin.findOne({ email }).lean();
    }
    if (!user) {
      user = await Professional.findOne({ email }).lean();
      isProfessional = !!user;
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isApproved === false) {
      return res.status(403).json({ message: 'Your account is not approved yet.' });
    }

    // Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access & refresh tokens
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7h" });
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Store refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    });

    // Construct user response
    let userResponse: any = {
      id: user._id,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture || null,
      age : user.age, 
      hasCompletedTest: user.hasCompletedTest,
      lastname : user.lastname,
    
      isApproved : user.isApproved,

    };

    if (isProfessional) {
      userResponse = {
        ...userResponse,
        firstName: user.firstName,
        lastName: user.lastname,
        specialite: user.specialite,
        description: user.description,
        contact: user.contact,
        isApproved : user.isApproved,
      };
    } else {
      userResponse.name = user.name ;
      userResponse.lastName=user.lastname;
    }
    if (user.role === "professional") {
      return res.status(200).json({
        message: "Login successful",
        token,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          lastname : user.lastname,
          profilePicture: user.profilePicture,
          contact: user.contact,  
          specialite: user.specialite,  
          description: user.description,  
          isApproved : user.isApproved,

        },
      });
    }
    

    return res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
      user: userResponse, // Always returns as "user"
    });
    

  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};




export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
    });

    // Optionally, clear any session data or JWT tokens if you're storing them in the session
    // For example:
    // req.session = null; // If using a session for authentication

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "An unknown error occurred",

    })}
  }





  export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // Extraire le token de l'en-tête Authorization
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant" });
      }
  
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
  
      let user = await User.findById(decoded.id).select("-password");
      if (user) {
        return res.status(200).json({ role: "user", user });
      }
  
      let pro = await Professional.findById(decoded.id).select("-password");
      if (pro) {
        return res.status(200).json({ role: "pro", user: pro });
      }
  
      let admin = await Admin.findById(decoded.id).select("-password");
      if (admin) {
        return res.status(200).json({ role: "admin", user: admin });
      }
  
      return res.status(404).json({ message: "Utilisateur non trouvé" });
  
    } catch (error) {
      console.error("Erreur dans getUserProfile:", error);
      return res.status(500).json({ message: "Erreur serveur", error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite" });
    }
  };
  
  
  




//delete profile par l'admin
export const deleteProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const id = req.params.id;
    console.log("ID reçu:",id);

    if (!id) {
      return res.status(400).json({ message: "ID utilisateur non fourni" });
    }

    let userType = ""; // Variable pour stocker le type d'utilisateur
    let user = await User.findById(id);
    if (user) {
      userType = "user";
    } else {
      user = await Professional.findById(id);
      if (user) {
        userType = "professional";
      }
    }
    if (!user){
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    let rep;
    if (userType==="user")
    { 
      rep=await User.findByIdAndDelete(id);
    }
    else{
      rep=await Professional.findByIdAndDelete(id);
    }
    console.log("Résultat suppression:", rep);

    return res.status(200).json({ message: "Utilisateur supprimé avec succès", userType });


  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
    });
  }
};


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    
    // Récupérer tous les utilisateurs avec le rôle "user"
    const users = await User.find()
      .select("name lastname role profilePicture") // Sélection des champs à afficher
    return res.status(200).json({
      message: "Liste des utilisateurs récupérée avec succès",
      users
    });

  } catch (error) {
    console.error("Erreur dans getAllUsers:", error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
    });
  }
};


// export const getAllProfessional = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//   try {
//     // Récupérer tous les utilisateurs avec le rôle "user"
//     const users = await User.find({ role:"professional" }).select("name lastname role profilePicture")
//     return res.status(200).json({
//       message: "Liste des professionels récupérée avec succès",
//       users
//     });

//   } catch (error) {
//     console.error("Erreur dans getAllProfessional:", error);
//     return res.status(500).json({
//       message: "Erreur serveur",
//       error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
//     });
//   }
// };

//nombre des prof
//nombre des user


//réinitialiser password 
export const requestResetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    let model: Model<any> | null = null;

    // Rechercher l'utilisateur dans toutes les collections
    let user = await User.findOne({ email });
    model = User;

    if (!user) {
      user = await Professional.findOne({ email });
      model = Professional;
    }

    if (!user) {
      user = await Admin.findOne({ email });
      model = Admin;
    }

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Générer un token sécurisé de 32 octets
    let resetToken: string | null = null;
    try {
      resetToken = crypto.randomBytes(32).toString("hex");
      console.log("🔹 Token généré avant hachage:", resetToken);
    } catch (error) {
      console.error("Erreur lors de la génération du token:", error);
    }

    // Si resetToken est généré correctement, procéder au hachage
    let hashedToken: string | null = null;
    if (resetToken) {
      try {
        hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        console.log("🔹 Token haché :", hashedToken);
      } catch (error) {
        console.error("Erreur lors du hachage du token:", error);
        return res.status(500).json({ message: "Erreur lors du hachage du token" });
      }
    } else {
      return res.status(500).json({ message: "Le token n'a pas été généré correctement." });
    }

    // Stocker le token haché et sa date d'expiration dans la base de données
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // Expire dans 1 heure

    // Sauvegarder correctement selon le modèle détecté
    await model.updateOne({ email }, { 
      resetPasswordToken: resetToken, 
      resetPasswordExpires: new Date(Date.now() + 3600000) 
    });

    // Lien sécurisé de réinitialisation
    const resetLink = `http://localhost:5174/auth/password-set/${resetToken}`; // Utiliser le resetToken avant le hachage pour le lien
   
    // Envoyer l'email
    await sendEmail({
      to: user.email,
      subject: "Réinitialisation de votre mot de passe",
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`,
      html: `
        <p>Bonjour,</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour le réinitialiser :</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 15px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Réinitialiser mon mot de passe</a>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas fait cette demande, ignorez cet email.</p>
        <p>Cordialement,</p>
        <p><strong>L'équipe SoulSpring</strong></p>
      `,
    });

    return res.json({ message: "Email de réinitialisation envoyé avec succès", token: resetToken });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};






export const verifyResetToken = async (req: Request, res: Response): Promise<any> => {
  try {
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Token haché reçu :", hashedToken);

    // Vérifier si un utilisateur a ce token
    let  user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: new Date() } }) ||await Professional.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: new Date() } })  || await Admin.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: new Date() } });

    if (!user) {
      return res.status(400).json({ message: "Token invalide ou expiré" });
    }

    return res.status(200).json({ message: "Token valide", userId: user._id , user:user.role});
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};



export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { token } = req.params;
    console.log("Token reçu :", token);

    const { password: newPassword, password_confirmation } = req.body;

    // Vérification de l'existence du mot de passe avant de tester sa longueur
    if (!newPassword) {
      return res.status(400).json({ message: "Mot de passe requis pour la réinitialisation" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Mot de passe trop court (min. 8 caractères)" });
    }

    if (password_confirmation !== newPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    let user: any = null;

    // Hash the received token to compare with stored hashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Token haché reçu :", hashedToken);

    // Check if user exists in different collections
    user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
    console.log("Recherche dans User - Token haché :", token, "resetPasswordExpires :", new Date(), "User trouvé :", user);
    if (!user) {
      user = await Admin.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
      console.log("Recherche dans Admin - Token haché :", token, "resetPasswordExpires :", new Date(), "User trouvé :", user);
    }
    if (!user) {
      user = await Professional.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
      console.log("Recherche dans Professional - Token haché :", token, "resetPasswordExpires :", new Date(), "User trouvé :", user);
    }

    if (!user) {
      console.log("Aucun utilisateur trouvé avec ce token.");
      return res.status(401).json({ message: "Token invalide ou expiré" });
    }

    // Mettre à jour le mot de passe
    const userModel = user.constructor; // Obtenir le modèle utilisé
    await userModel.updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
      }
    );

    return res.json({ message: "Mot de passe réinitialisé avec succès", user: user.role });

  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe :", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};