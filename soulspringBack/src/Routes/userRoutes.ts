
import express from "express";
import  {createUser , getUserProfile, loginUser , updateUser , 
    deleteProfile,
    requestResetPassword,verifyResetToken,resetPassword,logoutUser,
    getAllUsers} from "../Controller/UserController";
    
import upload from "../Middleware/upload";

import { authMiddleware, } from "../Middleware/authMiddleware";
import { isAdmin } from "../Middleware/isAdmin";

 

const userRoutes = express.Router();

// Route pour la création d'un utilisateur
userRoutes.post("/signup",upload.single('image'),createUser);
userRoutes.post("/login",loginUser);

userRoutes.post("/logout",loginUser);
userRoutes.get("/profile",getUserProfile);
userRoutes.put("/update/:id",upload.single('profilePicture'),authMiddleware,updateUser);
userRoutes.delete("/deleteProfile/:id",authMiddleware,isAdmin,deleteProfile);
userRoutes.get("/getAllUsers",authMiddleware,getAllUsers);
// userRoutes.get("/getAllProfessional",authMiddleware,isAdmin,getAllProfessional);
userRoutes.post("/ResetPassword/:token",resetPassword);
userRoutes.post("/verifyResetToken/:token",verifyResetToken);
userRoutes.post("/requestResetPassword",requestResetPassword);





export default userRoutes;
