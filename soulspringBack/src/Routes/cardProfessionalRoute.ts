import express from "express";
import {getProfessionalsForCard} from "../Controller/CardProfController"
import { authMiddleware, } from "../Middleware/authMiddleware";



const CardProfessionalrouter = express.Router();

CardProfessionalrouter.get("/getProfessionalsForCard",authMiddleware, getProfessionalsForCard);


export default CardProfessionalrouter;
