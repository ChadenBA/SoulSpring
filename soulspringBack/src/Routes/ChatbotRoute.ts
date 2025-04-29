// src/routes/chatbot.ts
import express, { Request, Response } from 'express';
import { authMiddleware, } from "../Middleware/authMiddleware";
import { handleChatbotMessage, getHistorique } from '../Controller/CHatbotController';

const chatbotRouter = express.Router();

chatbotRouter.post('/chatbot', authMiddleware,handleChatbotMessage);
chatbotRouter.get('/historiqueMessages/:userId',authMiddleware, getHistorique);

// Une route GET de test pour vérifier le bon fonctionnement de l’API
chatbotRouter.get('/test', (req, res) => {
    res.send('✅ La route test fonctionne');
  });
  

export default chatbotRouter;
