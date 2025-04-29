// import React, { useEffect, useState } from 'react';
// import { useGetResultQuery } from '@redux/apis/user/TestApi';
// import {
//   Typography,
//   Box,
//   CircularProgress,
//   Alert,
//   Grid,
//   LinearProgress,
//   Chip,
//   IconButton,
//   Divider,
// } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import { useAppSelector } from '@redux/hooks';
// import { green, red, yellow, grey } from '@mui/material/colors';
// import { TrendingUp, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@mui/icons-material';

// export const ResultsPage: React.FC = () => {
//   const user = useAppSelector((state) => state.auth.user);
//   const userId = user?.id;
//   const { t } = useTranslation();
//   const { data, isLoading, isError } = useGetResultQuery({ userId });
//   const [stressPercentage, setStressPercentage] = useState<number>(0);
//   const [stressPrediction, setStressPrediction] = useState<string>('');
//   const [disorderPrediction, setDisorderPrediction] = useState<string>('');
//   const [disorderSeverity, setDisorderSeverity] = useState<string>('');

//   useEffect(() => {
//     if (data) {
//       setStressPercentage(data?.data?.stressPrediction?.Percentage || 0);
//       setStressPrediction(data?.data?.stressPrediction?.stressprediction || '');
//       setDisorderPrediction(data?.data?.disorderPrediction?.disorderPrediction || '');
//       setDisorderSeverity(data?.data?.disorderPrediction?.severity || '');
//     }
//   }, [data]);

//   if (isLoading) return <CircularProgress />;
//   if (isError) return <Alert severity="error">{t('Error fetching results')}</Alert>;

//   // Color logic for progress bar
//   const progressColor = stressPercentage > 70 ? red[500] : stressPercentage > 30 ? yellow[500] : green[500];
//   const severityColor = disorderSeverity === 'Severe' ? red[500] : disorderSeverity === 'Moderate' ? yellow[500] : green[500];

//   return (
//     <Box m={4} maxWidth="1200px" margin="auto">
//       <Typography variant="h3" color="primary" gutterBottom align="center">
//         {t('Your Results')}
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {/* Stress Percentage */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Box p={3} bgcolor="white" borderRadius={2} border="1px solid #ddd" boxShadow={1}>
//             <Typography variant="h6" color="textSecondary">{t('Stress Level')}</Typography>
//             <LinearProgress
//               variant="determinate"
//               value={stressPercentage}
//               sx={{
//                 height: 12,
//                 borderRadius: 5,
//                 backgroundColor: grey[300],
//                 marginBottom: 2,
//               }}
//               color="primary"
//             />
//             <Typography variant="h5" color="textPrimary">{stressPercentage}%</Typography>
//             <Chip label={t('Stress')} sx={{ backgroundColor: progressColor, color: 'white', fontWeight: 'bold' }} />
//           </Box>
//         </Grid>

//         {/* Disorder Prediction */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Box p={3} bgcolor="white" borderRadius={2} border="1px solid #ddd" boxShadow={1}>
//             <Typography variant="h6" color="textSecondary">{t('Disorder Prediction')}</Typography>
//             <Typography variant="body1" color="textSecondary">{disorderPrediction}</Typography>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="body2" color="textSecondary">{t('Severity')}:</Typography>
//             <Chip
//               label={disorderSeverity}
//               sx={{
//                 backgroundColor: severityColor,
//                 color: 'white',
//                 fontWeight: 'bold',
//                 padding: '6px 12px',
//                 marginTop: 1,
//               }}
//             />
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Stress Prediction Description */}
//       <Box mt={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
//         <Typography variant="h6" color="textSecondary" textAlign="center">
//           {t('Your stress prediction indicates')} <strong>{stressPrediction}</strong>.
//         </Typography>
//       </Box>

//       {/* Icon-Based Emotional Indicators */}
//       <Box mt={6} display="flex" justifyContent="center" alignItems="center" gap={2}>
//         <IconButton size="large" sx={{ color: red[500] }}>
//           <SentimentVeryDissatisfied fontSize="inherit" />
//         </IconButton>
//         <IconButton size="large" sx={{ color: yellow[500] }}>
//           <TrendingUp fontSize="inherit" />
//         </IconButton>
//         <IconButton size="large" sx={{ color: green[500] }}>
//           <SentimentVerySatisfied fontSize="inherit" />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

//  export default ResultsPage;



// import React, { useEffect, useState } from 'react';
// import { useGetResultQuery } from '@redux/apis/user/TestApi';
// import {
//   Typography,
//   Box,
//   CircularProgress,
//   Alert,
//   Stack,
  
//   Grid,
//   LinearProgress,
//   Chip,
//   Card,
//   CardContent,
//   CardHeader
// } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import { useAppSelector } from '@redux/hooks';
// import { green, red, yellow, grey } from '@mui/material/colors';

// const ResultsPage: React.FC = () => {
//   const user = useAppSelector((state) => state.auth.user);
//   const userId = user?.id;
//   const { t } = useTranslation();
//   const { data, isLoading, isError } = useGetResultQuery({ userId });
//   const [stressPercentage, setStressPercentage] = useState<number>(0);
//   const [stressPrediction, setStressPrediction] = useState<string>('');
//   const [disorderPrediction, setDisorderPrediction] = useState<string>('');
//   const [disorderSeverity, setDisorderSeverity] = useState<string>('');

//   useEffect(() => {
//     if (data) {
//       console.log('Fetched Silverman results:', data);

//       setStressPercentage(data?.data?.stressPrediction?.Percentage || 0);
//       setStressPrediction(data?.data?.stressPrediction?.stressprediction || '');
//       setDisorderPrediction(data?.data?.disorderPrediction?.disorderPrediction || '');
//       setDisorderSeverity(data?.data?.disorderPrediction?.severity || '');
//     }
//   }, [data]);

//   if (isLoading) return <CircularProgress />;
//   if (isError) return <Alert severity="error">{t('Error fetching results')}</Alert>;

//   // Progress bar style for stress percentage
//   const progressColor = stressPercentage > 70 ? red[500] : stressPercentage > 30 ? yellow[500] : green[500];

//   return (
//     <Stack spacing={4} m={4} alignItems="center">
//       <Typography variant="h3" color="primary" gutterBottom>
//         {t('Your Results')}
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {/* Stress Percentage Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
//             <CardHeader title={t('Stress Level')} />
//             <CardContent>
//               <Box mb={2}>
//                 <Typography variant="h5">{stressPercentage}%</Typography>
//                 <LinearProgress
//                   variant="determinate"
//                   value={stressPercentage}
//                   sx={{ height: 10, borderRadius: 5, backgroundColor: grey[300] }}
//                   color="secondary"
//                 />
//               </Box>
//               <Chip label={t('Stress')} sx={{ backgroundColor: progressColor, color: 'white', fontWeight: 'bold' }} />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Disorder Prediction Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
//             <CardHeader title={t('Disorder Prediction')} />
//             <CardContent>
//               <Typography variant="h6" color="textSecondary">{disorderPrediction}</Typography>
//               <Typography variant="body2" color="textSecondary">{t('Severity')}:</Typography>
//               <Chip
//                 label={disorderSeverity}
//                 sx={{
//                   backgroundColor: disorderSeverity === 'Severe' ? red[500] : disorderSeverity === 'Moderate' ? yellow[500] : green[500],
//                   color: 'white',
//                   fontWeight: 'bold'
//                 }}
//               />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box mt={4}>
//         {/* Stress Prediction Description */}
//         <Typography variant="h6" color="textSecondary" textAlign="center">
//           {t('Your stress prediction indicates')} <strong>{stressPrediction}</strong>.
//         </Typography>
//       </Box>
//     </Stack>
//   );
// };





// export default ResultsPage;
// import React, { useEffect, useState } from 'react';
// import { useGetResultQuery } from '@redux/apis/user/TestApi';
// import {
//   Typography,
//   Box,
//   CircularProgress,
//   Alert,
//   Stack,
//   Grid,
//   Chip,
//   Card,
//   CardContent,
//   CardHeader
// } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import { useAppSelector } from '@redux/hooks';
// import { green, red, yellow, grey } from '@mui/material/colors';
// import {   MemeImage } from '@assets/meme.svg';  // Assuming meme image is in the assets folder
// import { Image } from '@mui/icons-material';

// const ResultsPage: React.FC = () => {
//   const user = useAppSelector((state) => state.auth.user);
//   const userId = user?.id;
//   const { t } = useTranslation();
//   const { data, isLoading, isError } = useGetResultQuery({ userId });
//   const [stressPercentage, setStressPercentage] = useState<number>(0);
//   const [stressPrediction, setStressPrediction] = useState<string>('');
//   const [disorderPrediction, setDisorderPrediction] = useState<string>('');
//   const [disorderSeverity, setDisorderSeverity] = useState<string>('');

//   useEffect(() => {
//     if (data) {
//       console.log('Fetched Silverman results:', data);

//       setStressPercentage(data?.data?.stressPrediction?.Percentage || 0);
//       setStressPrediction(data?.data?.stressPrediction?.stressprediction || '');
//       setDisorderPrediction(data?.data?.disorderPrediction?.disorderPrediction || '');
//       setDisorderSeverity(data?.data?.disorderPrediction?.severity || '');
//     }
//   }, [data]);

//   if (isLoading) return <CircularProgress />;
//   if (isError) return <Alert severity="error">{t('Error fetching results')}</Alert>;

//   // Progress circle color for stress percentage
//   const progressColor = stressPercentage > 70 ? red[500] : stressPercentage > 30 ? yellow[500] : green[500];

//   // Meme message based on stress level
//   const memeMessage = stressPercentage > 70 ? "Oh nooo, you're stressed!" : stressPercentage > 30 ? "Take a deep breath..." : "You're doing great!";

//   return (
//     <Stack spacing={4} m={4} alignItems="center">
//       <Typography variant="h3" color="primary" gutterBottom>
//         {t('Your Results')}
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {/* Stress Percentage Card with Circular Progress */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
//             <CardHeader title={t('Stress Level')} />
//             <CardContent>
//               <Box mb={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
//                 <CircularProgress
//                   variant="determinate"
//                   value={stressPercentage}
//                   size={120}
//                   thickness={4}
//                   sx={{
//                     color: progressColor,
//                     position: 'relative',
//                   }}
//                 />
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     position: 'absolute',
//                     fontWeight: 'bold',
//                     color: progressColor,
//                   }}
//                 >
//                   {stressPercentage}%
//                 </Typography>
//                 <Chip label={t('Stress')} sx={{ backgroundColor: progressColor, color: 'white', fontWeight: 'bold' }} />
//               </Box>
//               <Typography variant="body2" color="textSecondary" textAlign="center">
//                 {memeMessage}
//               </Typography>
//               {/* Optional: Display a meme image */}
              
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Disorder Prediction Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
//             <CardHeader title={t('Disorder Prediction')} />
//             <CardContent>
//               <Typography variant="h6" color="textSecondary">{disorderPrediction}</Typography>
//               <Typography variant="body2" color="textSecondary">{t('Severity')}:</Typography>
//               <Chip
//                 label={disorderSeverity}
//                 sx={{
//                   backgroundColor: disorderSeverity === 'Severe' ? red[500] : disorderSeverity === 'Moderate' ? yellow[500] : green[500],
//                   color: 'white',
//                   fontWeight: 'bold'
//                 }}
//               />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box mt={4}>
//         {/* Stress Prediction Description */}
//         <Typography variant="h6" color="textSecondary" textAlign="center">
//           {t('Your stress prediction indicates')} <strong>{stressPrediction}</strong>.
//         </Typography>
//       </Box>
//     </Stack>
//   );
// };

// export default ResultsPage;





import React, { useEffect, useState } from 'react';
import { useGetResultQuery } from '@redux/apis/user/TestApi';
import { Pie } from 'react-chartjs-2';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Paper,
  Grid,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useAppSelector } from '@redux/hooks';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ResultsPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetResultQuery({ userId });
  const [stressPercentage, setStressPercentage] = useState<number>(0);
  const [stressPrediction, setStressPrediction] = useState<string>('');
  const [disorderPrediction, setDisorderPrediction] = useState<string>('');
  const [disorderSeverity, setDisorderSeverity] = useState<string>('');

  useEffect(() => {
    if (data) {
      console.log('Fetched Silverman results:', data);

      setStressPercentage(data?.data?.stressPrediction?.Percentage || 0);
      setStressPrediction(data?.data?.stressPrediction?.stressprediction || '');
      setDisorderPrediction(data?.data?.disorderPrediction?.disorderPrediction || '');
      setDisorderSeverity(data?.data?.disorderPrediction?.severity || '');
    }
  }, [data]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{t('Error fetching results')}</Alert>;

  // Pie chart data for the stress prediction
  const pieChartData = {
    labels: ['Stress Level', 'No Stress'],
    datasets: [
      {
        label: t('Stress Level'),
        data: [stressPercentage, 100 - stressPercentage],
        backgroundColor: ['rgba(255,99,132,0.7)', 'rgba(75,192,192,0.7)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(75,192,192,1)'],
        borderWidth: 1
      }
    ]
  };

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          }
        }
      },
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <Stack spacing={4} m={4}>
      <Typography variant="h4" gutterBottom align="center">
        {t('Your Results')}
      </Typography>

      <Grid container spacing={4}>
        {/* Stress Prediction Pie Chart */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center">
              {t('Stress Percentage')}
            </Typography>
            <Pie data={pieChartData} options={pieChartOptions} />
            <Typography variant="body1" align="center" mt={2}>
              {t('Your stress percentage is')}: {stressPercentage}%
            </Typography>
          </Paper>
        </Grid>

        {/* Disorder Prediction Box */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6">{t('Disorder Prediction')}</Typography>
            <Typography variant="body1" mt={2} mb={1}>
              <Chip label={disorderPrediction} color="primary" />
            </Typography>
            <Typography variant="body2">{t('Severity')}:</Typography>
            <Typography variant="h6" color={disorderSeverity === 'Severe' ? 'error' : 'primary'}>
              {disorderSeverity}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h6" color="textSecondary">
          {t('Additional Insights')}
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          {t('Your stress prediction indicates')} <strong>{stressPrediction}</strong>.
        </Typography>
      </Box>
    </Stack>
  );
};

export default ResultsPage;

