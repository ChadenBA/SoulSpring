import { useState } from 'react';
import {
  Avatar,
  Collapse,
  DialogProps,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  StyledButton,
  StyledExpandIcon,
} from '../courseEducationalUnits/courseEducationalUnits.style';
import play from '@assets/logo/play.svg';
import { CourseLearningObjectProps } from './CourseLearningObject.type';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { GREY } from '@config/colors/colors';
import { t } from 'i18next';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import QuizDetails from './quizDetails/QuizDetails';
import CourseLearningObjectDetails from './CourseLearningObjectDetails';
import { Lo } from 'types/models/Lo';

const CourseLearningObject = ({
  lo,
  isEnrolled,
  passedQuizzes,
  index,
  eduUnitIndex,
}: CourseLearningObjectProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const onCollapseClick = () => setIsOpened((prev) => !prev);

  const handleOpenQuizDialog = () => {
    setOpenQuiz(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenDialog = (scrollType: DialogProps['scroll'], mediaIndex: number) => () => {
    if (eduUnitIndex === 0 || (index === 0 && passedQuizzes > 0)) {
      setCurrentMediaIndex(mediaIndex);
      setScroll(scrollType);
      setOpen(true);
    }
  };

  function isItemEnabled(learningObjects: Lo[], currentIndex: number) {
    if (eduUnitIndex === 0 && index === 0) {
      return true;
    }
    return learningObjects[currentIndex - 1].quiz.isPassed;
  }

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          border: `1px solid ${isOpened ? theme.palette.primary.main : GREY.light}`,
          borderRadius: 1,
          padding: 1,
          transition: 'all 0.3s',
          marginBottom: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={onCollapseClick}
        >
          <Typography
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            variant="h6"
            color={isOpened ? 'primary.main' : 'text.primary'}
          >
            {lo.title}
          </Typography>
          <IconButton>
            <StyledExpandIcon
              isopened={isOpened ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
            />
          </IconButton>
        </Stack>
        <Collapse in={isOpened} timeout={200}>
          <Stack spacing={2}>
            {lo.media && lo.media.length > 0 && (
              <Stack spacing={1}>
                {lo.media
                  .filter((mediaItem) => !mediaItem.isSupplementary)
                  .map((mediaItem, mediaIndex) => (
                    <Stack key={mediaItem.id} direction="row" alignItems="center">
                      <Avatar variant="rounded" sx={{ width: 20, height: 20 }} src={play} />
                      <StyledButton
                        disabled={!isEnrolled || !isItemEnabled}
                        onClick={handleOpenDialog('body', mediaIndex)}
                        variant="text"
                      >
                        {mediaItem.title}
                      </StyledButton>
                    </Stack>
                  ))}
              </Stack>
            )}
            {lo.media && lo.media.filter((mediaItem) => mediaItem.isSupplementary).length > 0 && (
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ textDecoration: 'underline' }}>
                  {t('eu.supplementary_materials')}
                </Typography>
                {lo.media
                  .filter((mediaItem) => mediaItem.isSupplementary)
                  .map((mediaItem, index) => (
                    <Stack key={index} direction="row" alignItems="center">
                      <Avatar variant="rounded" sx={{ width: 20, height: 20 }} src={play} />
                      <StyledButton
                        disabled={!isEnrolled || !isItemEnabled}
                        onClick={handleOpenDialog('body', index)}
                        variant="text"
                      >
                        {mediaItem.title}
                      </StyledButton>
                    </Stack>
                  ))}
              </Stack>
            )}
            {lo.quiz && lo.quiz.questions.length > 0 && (
              <Stack direction={'row'} alignItems={'center'}>
                <PsychologyAltOutlinedIcon />
                <StyledButton
                  onClick={handleOpenQuizDialog}
                  disabled={!isEnrolled || !isItemEnabled}
                >
                  <Typography
                    fontWeight={'medium'}
                    sx={{
                      '&:hover': {
                        textDecoration: 'none',
                        color: 'primary',
                      },
                    }}
                  >
                    {t('section.quiz.quiz')}
                  </Typography>
                </StyledButton>
              </Stack>
            )}
          </Stack>
        </Collapse>
        <QuizDetails open={openQuiz} onClose={() => setOpenQuiz(false)} lo={lo} />
      </Stack>
      <Stack>
        <CourseLearningObjectDetails
          open={open}
          onClose={handleClose}
          scroll={scroll}
          lo={lo}
          isEnrolled={isEnrolled}
          currentMediaIndex={currentMediaIndex}
        />
      </Stack>
    </>
  );
};

export default CourseLearningObject;
