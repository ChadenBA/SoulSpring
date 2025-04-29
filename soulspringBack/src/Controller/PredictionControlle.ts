import { Request, Response } from "express";
import axios from "axios";
import mongoose from "mongoose";
import Answer from "../Models/AnswerModel";
import ProcessedAnswers from "../Models/ProcAnwersModel";
import TestResult from "../Models/DignoseModel";
import stringify from 'json-stringify-safe';
import { processAnswers } from "./AnwserController";
import { User } from "../Models/UsersModel";

// Flask API URLs
const STRESS_API_URL = "http://127.0.0.1:5000/predict_stress";
const DISORDER_API_URL = "http://127.0.0.1:5000/predict_disorder";

// Retry helper function
const retryRequest = async (url: string, data: any, retries: number = 3, delay: number = 1000): Promise<any> => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise(res => setTimeout(res, delay));
      return retryRequest(url, data, retries - 1, delay * 2);
    }
    console.error(`API request failed: ${error.message}`);
    throw new Error(`API request failed after retries: ${error.message}`);
  }
};

export const submit = async (req: Request, res: Response): Promise<any> => {
  const { responses } = req.body;
  console.log("Request Body: ", req.body);

  if (!Array.isArray(responses) || responses.length === 0) {
    return res.status(400).json({ message: 'Invalid request. Responses are required.' });
  }

  try {
    const userId = responses[0].userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    await Answer.create({
      answers: responses.map((answer: any) => ({
        userId: userId,
        questionId: answer.question_id,
        option: answer.answer,
      }))
    });

    const { stressAnswers, disorderAnswers } = await processAnswers(responses);

    await ProcessedAnswers.create({
      userId: userId,
      stressAnswers,
      disorderAnswers,
    });

    console.log("UserId received:", userId);
    const processedAnswers = await ProcessedAnswers.findOne({ userId }).exec();

    if (!processedAnswers) {
      return res.status(400).json({ message: 'Processed answers not found for this user' });
    }

    // Call the Flask API
    const stressPredictionResult = await retryRequest(STRESS_API_URL, { userId, answers: stressAnswers });
    const disorderPredictionResult = await retryRequest(DISORDER_API_URL, { userId, answers: disorderAnswers });

    if (!stressPredictionResult || !stressPredictionResult.stressCategory || !stressPredictionResult.stressPercentage) {
      return res.status(500).json({ message: 'Error: Invalid stress prediction result' });
    }

    // Update or insert TestResult
    const updatedResult = await TestResult.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      {
        $set: {
          "stressPrediction.stressprediction": stressPredictionResult.stressCategory,
          "stressPrediction.Percentage": stressPredictionResult.stressPercentage,
          "disorderPrediction.disorderPrediction": disorderPredictionResult.disorderPrediction,
          "disorderPrediction.severity": disorderPredictionResult.severity
        }
      },
      { upsert: true, new: true }
    );
    console.log(userId)

    // Set the 'hasCompletedTest' field
    const user = await setUserHasCompletedTest(userId);

    console.log(user);

    return res.status(201).json({
      message: 'Prediction successfully made.',
      stressPrediction: stressPredictionResult,
      disorderPrediction: disorderPredictionResult
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
};



export const getResult = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;

  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  try {
    // Find the result by userId
    const result = await TestResult.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();

    if (!result) {
      return res.status(404).json({ message: 'Result not found for this user' });
    }

    return res.status(200).json({
      message: 'Result fetched successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const setUserHasCompletedTest = async (userId: string) => {
  try {
    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid userId format');
      return;
    }

    // Use findById to get the user by its _id field
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      console.log('User not found with the given userId');
      return;
    }

    // Update the hasCompletedTest field to true
    const updatedUser = await User.findByIdAndUpdate(
      userId,  // Directly use the userId, as it's already an ObjectId
      { $set: { hasCompletedTest: true } },  // Update operation
      { new: true }  // Return the updated document
    );
    
    console.log('Updated user:', updatedUser);

  } catch (error) {
    console.error('Error in setting hasCompletedTest:', error);
    throw new Error('Failed to update hasCompletedTest');
  }
};
