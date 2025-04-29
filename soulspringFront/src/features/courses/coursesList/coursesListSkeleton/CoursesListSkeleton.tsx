import { Stack } from '@mui/material'
import CoursesCardSkeleton from '../../coursesCard/courseCardSkeleton/CourseCardSkeleton'

function CoursesListSkeleton() {
  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'center'}>
      {[...Array(8)].map((_, index) => (
        <CoursesCardSkeleton key={index} />
      ))}
    </Stack>
  )
}

export default CoursesListSkeleton
