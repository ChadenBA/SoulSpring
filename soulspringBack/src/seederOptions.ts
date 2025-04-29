import mongoose from 'mongoose';

import Option from './Models/OptionsModel';  // Adjust path as needed
import Question from './Models/QuestionModel';  // Adjust path as needed
import connectDB from './Config/DB';  // Adjust path as needed

const seedOptions = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing options
    await Option.deleteMany({});
    console.log('Options cleared!');

    // Find the questions that were inserted earlier
    const questions = await Question.find({});

    //  options for mental disorder questions 
    const options = [
        { optionstext:{ en: 'Yes', fr: 'Oui' }, questionId: questions[0]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[0]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[1]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[1]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[2]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[2]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[3]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[3]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[4]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[4]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[5]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[5]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[6]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[6]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[7]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[7]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[8]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[8]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[9]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[9]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[10]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[10]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[11]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[11]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[12]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[12]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[13]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[13]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[14]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[14]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[15]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[15]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[16]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[16]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[17]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[17]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[18]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[18]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[19]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[19]._id },
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[20]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[20]._id },
         { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[21]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[21]._id },
         { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[22]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[22]._id }, 
        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[23]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[23]._id },
         { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[24]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[24]._id },
         { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[25]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[25]._id },
         { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[26]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[26]._id }, 

        { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[27]._id },
        { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[27]._id },
    //  options for stress questions 

        // { optionstext: { en: 'Yes', fr: 'Oui' }, questionId: questions[27]._id },
        // { optionstext: { en: 'No', fr: 'Non' }, questionId: questions[27]._id },
    //  options for stress questions 


    {optionstext: { en: "Never", fr: "Jamais" },questionId: questions[27]._id
    },{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[27]._id
    },{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[27]._id
    },{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[27]._id},
    {optionstext: { en: "Never", fr: "Jamais" },questionId: questions[28]._id
    },{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[28]._id
    },{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[28]._id
    },{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[28]._id},
    
    {optionstext: { en: "Never", fr: "Jamais" },questionId: questions[29]._id
  },{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[29]._id
  },{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[29]._id
  },{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[29]._id},

  {optionstext: { en: "Never", fr: "Jamais" },questionId: questions[30]._id
},{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[30]._id
},{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[30]._id
},{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[30]._id},

{optionstext: { en: "Never", fr: "Jamais" },questionId: questions[31]._id
},{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[31]._id
},{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[31]._id
},{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[31]._id},

{optionstext: { en: "Never", fr: "Jamais" },questionId: questions[32]._id
},{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[32]._id
},{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[32]._id
},{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[32]._id},

{optionstext: { en: "Never", fr: "Jamais" },questionId: questions[33]._id
},{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[33]._id
},{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[33]._id
},{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[33]._id},

{optionstext: { en: "Never", fr: "Jamais" },questionId: questions[34]._id
},{ optionstext: { en: "Sometimes", fr: "Parfois" },questionId: questions[34]._id
},{optionstext: { en: "Often", fr: "Souvent" },questionId: questions[34]._id
},{optionstext:{ en: "Very often", fr: "Très souvent" },questionId: questions[34]._id},



    
    

      ];
      

    // Insert options
    const insertedOptions = await Option.insertMany(options);
    console.log(`${insertedOptions.length} options inserted.`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding options:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedOptions();
