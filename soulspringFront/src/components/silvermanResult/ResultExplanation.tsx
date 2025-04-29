import React from 'react';
import { Box, Typography } from '@mui/material';
import { LearningStyleData } from 'types/interfaces/SilvermanResultData';
import useStyles from './ResultExplanation.style';
import { useTranslation } from 'react-i18next';

interface ResultExplanationProps {
  scores: {
    [key: string]: LearningStyleData;
  };
}

const ResultExplanation: React.FC<ResultExplanationProps> = ({ scores }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const pairs = [
    { left: 'Reflective', right: 'Active' },
    { left: 'Intuitive', right: 'Sensing' },
    { left: 'Auditory', right: 'Visual' },
    { left: 'Global', right: 'Sequential' },
  ];

  const getDescription = (category: string) => {
    const descriptions: { [key: string]: string } = {
      Active: t('users.explinationActive'),
      Reflective: t('users.explinationReflective'),
      Intuitive: t('users.explinationIntuitive'),
      Sensing: t('users.explinationSensing'),
      Auditory: t('users.explinationAuditory'),
      Visual: t('users.explinationVisual'),
      Global: t('users.explinationGlobal'),
      Sequential: t('users.explinationSequential'),
    };

    return descriptions[category] || t('users.No description available.');
  };

  const getMaxPreferenceForPairs = () => {
    const maxPreferences = pairs.map((pair) => {
      const leftScore = Math.abs(Number(scores[pair.left]?.score || 0));
      const rightScore = Math.abs(Number(scores[pair.right]?.score || 0));

      if (leftScore > rightScore) {
        return { category: pair.left, score: leftScore };
      } else {
        return { category: pair.right, score: rightScore };
      }
    });
    return maxPreferences;
  };

  const maxPreferences = getMaxPreferenceForPairs();

  return (
    <Box mt={4} className={classes.container}>
      <Typography variant="h1" component="h1" gutterBottom className={classes.title}>
        {t('users.whatmyresultmeans')}
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        {t('users.Richard_M_Felder')}
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        {t('users.ResultscoreExplanation')}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom className={classes.subtitle}>
        {t('users.strongpref')}
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        {t('users.strongprefparagraph')}
      </Typography>
      {maxPreferences.length > 0 ? (
        maxPreferences.map(({ category, score }) => (
          <Typography key={category} variant="body1" paragraph className={classes.paragraph}>
            <strong>{t(`users.silverman${category}`)}</strong> {t('users.withscore')}{' '}
            <strong>{score}</strong>.{getDescription(category)}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" paragraph className={classes.paragraph}>
          {t('users.No_strong_preference_identified')}
        </Typography>
      )}
    </Box>
  );
};

export default ResultExplanation;
