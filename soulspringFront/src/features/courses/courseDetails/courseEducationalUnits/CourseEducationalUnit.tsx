import { useState } from 'react';
import { Collapse, IconButton, Stack, Typography } from '@mui/material';
import { StyledExpandIcon, StyledMediaSection } from './courseEducationalUnits.style';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { CourseEducationalUnitProps } from './CourseEducationalUnit.type';
import CourseLearningObject from '../courseLearningObjects/CourseLearningObject';

function CourseEducationalUnit({
  eu,
  los,
  isEnrolled,
  passedQuizzes,
  euIndex,
}: CourseEducationalUnitProps) {
  const [isOpened, setIsOpened] = useState(false);

  const onCollapseClick = () => setIsOpened((prev) => !prev);

  return (
    <>
      <Stack spacing={1}>
        <StyledMediaSection onClick={onCollapseClick}>
          <Typography variant="h6">{eu.title}</Typography>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <IconButton>
              <StyledExpandIcon
                isopened={isOpened ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
              />
            </IconButton>
          </Stack>
        </StyledMediaSection>
        <Collapse in={isOpened} timeout={200}>
          <Stack spacing={1}>
            {los.map((lo, index) => (
              <CourseLearningObject
                index={index}
                key={index}
                lo={lo}
                isEnrolled={isEnrolled}
                passedQuizzes={passedQuizzes}
                eduUnitIndex={euIndex}
              />
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </>
  );
}

export default CourseEducationalUnit;
