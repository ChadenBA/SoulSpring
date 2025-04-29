import { PATHS } from '@config/constants/paths';
import { TableRow, TableCell, Tooltip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StudentQuizRowProps } from './StudentQuizRow.type';
import QuizStatusChip from '../QuizStatusChip/QuizStatusChip';
import { GREY } from '@config/colors/colors';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';
import { StyledTitleCell } from './StudentQuizRow.style';

function StudentQuizRow({ quiz }: StudentQuizRowProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const navigateToUserDetailPage = (id?: number) => {
    navigate(`${PATHS.COURSES.ROOT}/${id}`);
  };

  function calculateScorePercentage() {
    const scorePercentage = (quiz.score / quiz.totalScorePossible) * 100;
    return scorePercentage % 1 !== 0 ? scorePercentage.toFixed(2) : scorePercentage;
  }
  return (
    <TableRow key={quiz.id}>
      <TableCell>
        <Typography color={GREY.main} mb={2}>
          {quiz.createAt}
        </Typography>
        <Tooltip title={quiz?.quiz?.course?.title}>
          <Stack direction={'row'} spacing={1}>
            {quiz?.quiz?.course?.title != null ? (
              <Typography color={GREY.main}>{t('section.quiz.quiz')}</Typography>
            ) : (
              <Typography color={GREY.main}>{t('section.quiz.exam')}</Typography>
            )}

            <ErrorOutlineIcon fontSize="small" sx={{ cursor: 'pointer', color: GREY.main }} />
          </Stack>
        </Tooltip>
      </TableCell>

      <StyledTitleCell onClick={() => navigateToUserDetailPage(quiz?.quiz?.course?.id)}>
        {quiz?.quiz?.course?.title}
      </StyledTitleCell>

      <TableCell>{quiz.totalScorePossible}</TableCell>
      <TableCell>{quiz.score}</TableCell>
      <TableCell>{quiz.totalScorePossible}</TableCell>
      <TableCell>{`${calculateScorePercentage()}%`}</TableCell>
      <TableCell>{<QuizStatusChip status={quiz.status} />}</TableCell>
    </TableRow>
  );
}

export default StudentQuizRow;
