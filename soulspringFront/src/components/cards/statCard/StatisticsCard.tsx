import { Card, Typography, Box } from '@mui/material';
import { useCountUp } from '../../../hooks/useCountUp';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Accent pastel colors
const pastelColors = [
  '#ffcab0', '#9896f1', '#d59bf6', '#edb1f1', '#f4c2f2',
  '#f9d7f4', '#98d9e7', '#b5e7f4', '#c9f0f8', '#e3f9f7',
  '#f0f9f4', '#f6f9ea', '#f9f8d8', '#f9f3c7', '#f9eeb9',
  '#f9e4b9', '#f9dab9', '#f9d0b9', '#f9c6b9', '#f9bcb9',
  '#f9b2b9', '#f9a8b9', '#f99eb9', '#f994b9',
];

const StatisticsCard = ({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value?: number;
  subtitle?: string;
  icon: React.ReactNode;
}) => {
  const animatedValue = useCountUp(value || 0);

  // Choose a pastel color for accents
  const accentColor = useMemo(() => {
    const index = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[index];
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <Card
        sx={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 6,
          p: 3,
          minHeight: 170,
          boxShadow: `0 6px 20px ${accentColor}40`,
          color: '#2d2d2d',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              backgroundColor: accentColor,
              borderRadius: '50%',
              padding: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 3px 10px ${accentColor}80`,
              color: '#fff',
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mt: 0.5, mb: 0.5 }}
            >
              {animatedValue}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

export default StatisticsCard;
