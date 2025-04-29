import express from 'express';
import { getQuestions } from '../Controller/QuestionController';

const router = express.Router();

// Route to get all questions with their options
router.get('/user/test/questions', getQuestions);

export default router;
