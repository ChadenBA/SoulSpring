import { Request, Response } from 'express';
import Question from '../Models/QuestionModel';
import Option from '../Models/OptionsModel'; 


 /**
 *@desc get all questions
 *@route /user/test/questions
 *@method Get
 *@access public
 */

// Updated API call to include the language parameter
export const getQuestions = async (req: Request, res: Response) => {
    const language = (req.query.language as 'en' | 'fr') || 'en'; // Default to 'en' if no language is specified
  
    try {
      // Fetch questions
      const questions = await Question.find();
  
      // Fetch options for each question and format the result
      const formattedQuestions = await Promise.all(
        questions.map(async (question) => {
          // Find the options for this question
          const options = await Option.find({ questionId: question._id }).exec();
  
          // Format the options to include the correct language text
          const formattedOptions = options.map((option) => ({
            _id: option._id,
            optionstext: option.optionstext[language], // Fetch the option text in the specified language
          }));
  
          // Return the formatted question with options
          return {
            ...question.toObject(),
            qtext: question.qtext[language], // Fetch the question text in the specified language
            options: formattedOptions, // Attach the formatted options
          };
        })
      );
  
      // Return the formatted questions with their options
      res.json({
        questions: formattedQuestions,
      });
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
  };
  