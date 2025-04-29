import {
  ProfileGroup,
  ProfileName,
  ProfileRole,
  StyledAvatar,
  StyledCard,
  StyledContentCard,
} from './ProfileCard.style'
import { getUserRole } from '@utils/helpers/userRole.helpers'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@redux/hooks'

const ProfileCard = () => {
  const user = useAppSelector((state) => state.auth.user)
  //const media = useAppSelector((state) => state.auth.media)
  const { t } = useTranslation()

  return (
    <StyledCard>
      {user && (
        <>
          <StyledContentCard>
             <StyledAvatar src={user?.profilePicture?.url} alt="avatar" /> 
          </StyledContentCard>
          <ProfileGroup>
            <ProfileName variant="h6">
              {user?.firstName} {user?.lastName}
            </ProfileName>
            <ProfileRole>{t(getUserRole(user?.role))}</ProfileRole>
          </ProfileGroup>
        </>
      )}
    </StyledCard>
  )
}

export default ProfileCard
