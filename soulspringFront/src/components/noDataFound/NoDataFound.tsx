import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import jsonAnimation from '@assets/Animation.json'
import { DescriptionStyled } from '@components/typographies/description/description.style'
import Lottie from 'lottie-react'

function NoDataFound({ message }: NoDataFoundProps) {
  const { t } = useTranslation()
  return (
    <Stack alignItems={'center'} alignSelf={'center'} mt={20}>
      <Lottie
        animationData={jsonAnimation}
        loop={true}
        style={{ width: 250 }}
      />
      <DescriptionStyled>{t(message)}</DescriptionStyled>
    </Stack>
  )
}
export default NoDataFound
