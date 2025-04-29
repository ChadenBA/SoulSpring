import React from 'react';
import { Box, Typography } from '@mui/material';
import { LearningStyleData } from 'types/interfaces/SilvermanResultData';
import { useTranslation } from 'react-i18next';

interface ResultsDisplayProps {
  scores: {
    [key: string]: LearningStyleData;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ scores }) => {
  const { t } = useTranslation();

  if (!scores) return <Typography>No results available</Typography>;

  const pairs = [
    { left: 'Reflective', right: 'Active' },
    { left: 'Intuitive', right: 'Sensing' },
    { left: 'Auditory', right: 'Visual' },
    { left: 'Global', right: 'Sequential' },
  ];

  const renderProgressBar = (
    leftLabel: string,
    rightLabel: string,
    leftValue: number,
    rightValue: number,
  ) => {
    const totalRange = 22;
    const normalizedLeftValue = Math.abs((leftValue / totalRange) * 100);
    const normalizedRightValue = Math.abs((rightValue / totalRange) * 100);

    return (
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>{t(`users.silverman${leftLabel}`)}</Typography>
          <Typography>{t(`users.silverman${rightLabel}`)}</Typography>
        </Box>
        <Box
          position="relative"
          height={33}
          borderRadius={8}
          bgcolor="rgba(0, 0, 0, 0.1)"
          mt={1}
          width="100%"
        >
          <Box
            sx={{
              position: 'absolute',
              right: '50%',
              height: '100%',
              backgroundColor: '#fa853f',
              borderRadius: '0 8px 8px 0',
              animation: 'mymove-left 2s ease-out forwards',
              width: 0,
              animationDelay: '0.5s',
            }}
            style={{ '--target-width': `${normalizedLeftValue}%` } as React.CSSProperties}
          />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',

              height: '100%',
              backgroundColor: '#5d99c6',
              borderRadius: '8px 0 0 5px',
              animation: 'mymove-right 2s ease-out forwards',
              width: 0,
              animationDelay: '0.5s',
            }}
            style={{ '--target-width': `${normalizedRightValue}%` } as React.CSSProperties}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography>{leftValue}</Typography>
          <Typography>{rightValue}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {pairs.map((pair) => {
        const leftData: LearningStyleData = scores[pair.left] || {
          score: 0,
          category: '',
          percentage: '',
        };
        const rightData: LearningStyleData = scores[pair.right] || {
          score: 0,
          category: '',
          percentage: '',
        };
        return renderProgressBar(pair.left, pair.right, leftData.score, rightData.score);
      })}
    </>
  );
};

export default ResultsDisplay;
