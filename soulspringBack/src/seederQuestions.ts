import mongoose from 'mongoose';
import Question from './Models/QuestionModel';  
import Option from './Models/OptionsModel';      
import connectDB from "./Config/DB"; 

const seedQuestions = async () => {
    try {
       
        console.log("Connecting to database...");
        await connectDB(); // Ensure DB is connected before proceeding
        console.log("Connected to MongoDB");

        console.log("Deleting existing questions...");
        await Question.deleteMany({}); // Ensure the model is correctly imported
        await Option.deleteMany({}); // Ensure the model is correctly imported

        console.log("Database cleared!");
    // Array of questions and options in English and French
    const questions = [
        //  Mental illness related Questions
       
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you often feel nervous without an obvious reason?",
                    fr: "Vous sentez-vous souvent nerveux sans raison évidente ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Have you experienced a sudden sense of panic recently?",
                    fr: "Avez-vous récemment ressenti un soudain sentiment de panique ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you find yourself breathing rapidly in stressful situations?",
                    fr: "Vous retrouvez-vous à respirer rapidement dans des situations stressantes ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you sweat excessively when feeling anxious or stressed?",
                    fr: "Transpirez-vous excessivement lorsque vous vous sentez anxieux ou stressé ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you have trouble concentrating on tasks?",
                    fr: "Avez-vous du mal à vous concentrer sur les tâches ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Have you been having trouble sleeping at night?",
                    fr: "Avez-vous des difficultés à dormir la nuit ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Have you been having trouble with work",
                    fr: "Avez-vous des difficulté dans le travail ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you often feel hopeless about the future?",
                    fr: "Avez-vous souvent l'impression d'être sans espoir pour l'avenir ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you experience frequent feelings of anger?",
                    fr: "Ressentez-vous fréquemment de la colère ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you find yourself overreacting to minor situations?",
                    fr: "Avez-vous tendance à réagir de manière excessive à des situations mineures ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Have you noticed any changes in your eating habits?",
                    fr: "Avez-vous remarqué des changements dans vos habitudes alimentaires ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Have you ever had thoughts about self-harm or suicide?",
                    fr: "Avez-vous déjà eu des pensées sur l'automutilation ou le suicide ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you often feel physically exhausted without any clear reason?",
                    fr: "Ressentez-vous souvent une fatigue physique sans raison évidente ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you feel disconnected from close friends or avoid social interactions?",
                    fr: "Vous sentez-vous déconnecté de vos amis proches ou évitez-vous les interactions sociales ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Are you addicted to soiam media?",
                    fr: " Êtes-vous accro aux réseaux sociaux ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you have weight problems?",
                    fr: "Avez-vous des problèmes de poids ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Are you an introvert ?",
                    fr: "Êtes-vous introverti ?"
                },
            },

            {
                category: "Mental illness",
                qtext: {
                    en: "Do stressful memories suddenly pop up in your mind?",
                    fr: "Des souvenirs stressants vous reviennent-ils soudainement à l'esprit ?"
                },
            },

            {
                category: "Mental illness",
                qtext: {
                    en: "Do you find yourself having nightmares often",
                    fr: "Avez-vous souvent des cauchemars ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {

                    en: "Do tend to avoid people or activities ?",
                    fr: "Avez-vous tendance à éviter les gens ou les activités ?"
                },
            },
            
            {
                category: "Mental illness",
                qtext: {

                    en: "Do you feel negative ?",
                    fr: "Vous sentez-vous négatif ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you experience racing thoughts that make it hard to focus?",
                    fr: "Avez-vous des pensées rapides qui vous empêchent de vous concentrer ?"
                },
            },

            {
                category: "Mental illness",
                qtext: {
                    en: "Do you feel guilty or blamming yourself frequently?",
                    fr: "Vous sentez-vous souvent coupable ou sans valeur ?"
                },
            },

            {
                category: "Mental illness",
                qtext: {
                    en: "Have you ever experienced hallucinations?",
                    fr: "Avez-vous déjà vécu des hallucinations ?"
                },
            },
            
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you engage in repetitive behaviors?",
                    fr: "Avez-vous des comportements répétitifs ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you experience changes in your mood seasonally?",
                    fr: "Ressentez-vous des changements dans votre humeur selon les saisons ?"
                },
            },
            {
                category: "Mental illness",
                qtext: {
                    en: "Do you experience increased energy levels?",
                    fr: "Ressentez-vous une augmentation de votre niveau d'énergie ?"
                },
            },
        
    
    
        // Stress-related Questions
        {
            category: "Stress",
            qtext: {
                en: "Do you find it hard to wind down?",
                fr: "Avez-vous du mal à vous détendre ?"
            },
            
        },
        {
            category: "Stress",
            qtext: {
                en: "I tended to over-react to situations",
                fr: "J'avais tendance à réagir de manière excessive aux situations"
            },
        },
        {
            category: "Stress",
            qtext: {
                en: "I felt that I was using a lot of nervous energy",
                fr: "Je sentais que j'utilisais beaucoup d'énergie nerveuse"
            },
        },
        {
            category: "Stress",
            qtext: {
                en: "I found myself getting agitated",
                fr: "Je me trouvais en train de m'agiter"
            },
        },
        {
            category: "Stress",
            qtext: {
                en: "I found it difficult to relax",
                fr: "J'avais du mal à me détendre"
            },
        },
        {
            category: "Stress",
            qtext: {
                en: "I tended to over-react to situations",
                fr: "J'avais tendance à réagir de manière excessive aux situations"
            },
        },
        {
            category: "Stress",
            qtext: {
                en: "I was intolerant of anything that kept me from getting on with what I was doing",
                fr: "J'étais intolérant à tout ce qui m'empêchait de poursuivre ce que je faisais"
            },
        },
        {
            category: "Stress",
            qtext: {
                en: "I felt that I was rather touchy",
                fr: "Je sentais que j'étais plutôt susceptible"
            },
        }
,        
    ];
      // Insert questions
      const insertedQuestions = await Question.insertMany(questions);
      console.log(`${insertedQuestions.length} questions inserted.`);
  
      mongoose.connection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error seeding questions:', error);
      mongoose.connection.close();
      process.exit(1);
    }
  };
  
  seedQuestions();