import { Request, Response } from 'express';
import Answer from '../Models/AnswerModel'; 
import Question from '../Models/QuestionModel';
import ProcessedAnswers from '../Models/ProcAnwersModel'; 

// Mapping for converting options to numerical values
const stressAnswersMapping: { [key: string]: number } = {
  "Never": 0,
  "Sometimes": 1,
  "Often": 2,
  "Very often": 3,
  "Jamais": 0,        
  "Parfois": 1,       
  "Souvent": 2,       
  "Très souvent": 3   
};

const disorderAnswersMapping: { [key: string]: number } = {
  "Yes": 1,
  "No": 0,
  "Oui": 1,  
  "Non": 0   
};

// Process answers to extract features based on categories
export const processAnswers = async (responses: any[]) => {
    const stressAnswers: number[] = [];
    const disorderAnswers: number[] = [];

    // Loop over each answer and process asynchronously
    for (const an of responses) {
        const { question_id, answer } = an;  // Destructure questionId and answer

        try {
            // Fetch the question using the questionId (you could use a database query or populate the question)
            const question = await Question.findById(question_id); // Ensure this is async

            if (question) {
                const { category } = question;  // Get the category from the question model

                if (category === 'Stress') {
                    // Stress related answers (map answers to numerical values)
                    stressAnswers.push(stressAnswersMapping[answer] || 0);  // Default to 0 if mapping not found
                } else if (category === 'Mental illness') {
                    // Disorder related answers (map answers to binary values)
                    disorderAnswers.push(disorderAnswersMapping[answer] || 0);  // Default to 0 if mapping not found
                }
            }
        } catch (error) {
            console.error(`Error processing questionId ${question_id}:`, error);
        }
    }

    return {
        stressAnswers,
        disorderAnswers
    };
};



export const get_ProcAnswers = async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.params;  
    
    if (!userId) {
        return res.status(400).json({ message: 'UserId is required.' });
    }

    try {
        const procAnwers = await ProcessedAnswers.findOne({ userId });

        if (!procAnwers) {
            return res.status(404).json({ message: 'No anwers found for this user.' });
        }

        return res.status(200).json({
            message: 'anwers successfully retrieved.',
            procAnwers
        });
    } catch (error) {
        console.error('Error retrieving anwers:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
