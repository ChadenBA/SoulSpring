// src/controllers/chatbotController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import UserMessage from '../Models/ChatbotModel';

export const handleChatbotMessage = async (req: Request, res: Response): Promise<any> => {
  const { userMessage, user_id } = req.body;

  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ response: 'Veuillez poser une question.' });
  }
  if (!user_id) {
    return res.status(400).json({ response: 'Utilisateur non identifié.' });
  }
  try {
    // Communiquer avec l'API Flask pour obtenir la réponse
    const flaskResponse = await axios.post('http://localhost:5000/get_response', {
      message: userMessage
    });

    const chatbotResponse = flaskResponse.data.response;

    // Enregistrer la question de l'utilisateur et la réponse du chatbot dans la base de données
    const newMessage = new UserMessage({ question: userMessage, response: chatbotResponse, userId:user_id, });
    await newMessage.save();

    // Retourner la réponse de l'API Flask
    return res.json({ response: chatbotResponse });
  } catch (error) {
    console.error('Erreur lors de la communication avec l’API Flask:', error);
    return res.status(500).json({ response: 'Erreur interne du serveur.' });
  }
};

//getHistorique
export const getHistorique = async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "Identifiant utilisateur manquant." });
  }

  try {
    const messages = await UserMessage.find({ userId: userId }).sort({ timestamp: 1 });

    const historique = messages.map(msg => ({
      question: msg.question,
      response: msg.response,
      timestamp: msg.timestamp,
    }));

    return res.status(200).json({ historique });
  } catch (error) {
    console.error('Erreur lors de la récupération de l’historique :', error);
    return res.status(500).json({ message: "Erreur serveur lors de la récupération de l'historique." });
  }
};