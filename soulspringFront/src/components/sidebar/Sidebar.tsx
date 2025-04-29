import { SidebarTitle, StyledSidebarCard, StyledSidebarMenu } from './Sidebar.style';
import { useTranslation } from 'react-i18next';
import { SidebarItemsProps } from './SidebarItems.type';
import { UserRoleEnum } from '@config/enums/role.enum';
import { Logout, Settings } from '@mui/icons-material';
import { PATHS } from '@config/constants/paths';
import CustomSidebarLink from '@components/customLink/customSidebarLink/CustomSidebarLink';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { logout } from '@redux/slices/authSlice';
import { useLocation } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Sidebar({ sidebarItem }: SidebarItemsProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const user = useAppSelector((state) => state.auth.user);
  console.log("User Role:", user?.role);
console.log("Sidebar Items:", sidebarItem);
console.log("User Role:", user?.role, "Type:", typeof user?.role);

const role =
  user?.role === "admin"
    ? UserRoleEnum.ADMIN
    : user?.role === "professional"
    ? UserRoleEnum.PROFESSIONAL
    : UserRoleEnum.USER;

const filteredItems = sidebarItem.filter((item) =>
  item.accessibleRoles?.includes(role)
);
  return (
    <StyledSidebarCard>
    <SidebarTitle>{t('sidebar.dashboard')}</SidebarTitle>
    {filteredItems.map((item) => (
      <StyledSidebarMenu key={item.id}>
        <item.icon />
        <CustomSidebarLink
          to={item.path}
          label={t(item.label)}
          isActive={item.path === location.pathname}
        />
      </StyledSidebarMenu>
        ))}
        
        <StyledSidebarMenu>
        <AccountCircleIcon/>

        <CustomSidebarLink
          to={PATHS.DASHBOARD.PROFILE.ROOT}
          label={t('sidebar.profile')}
          isActive={PATHS.DASHBOARD.PROFILE.ROOT === location.pathname}
        />
        </StyledSidebarMenu>
      
      <SidebarTitle>{t('sidebar.account_settings')}</SidebarTitle>
      <StyledSidebarMenu>
        <Settings />
       
        <CustomSidebarLink
          to={PATHS.DASHBOARD.PROFILE.SETTINGS}
          label={t('sidebar.account_settings')}
          isActive={PATHS.DASHBOARD.PROFILE.SETTINGS === location.pathname}
        />
      </StyledSidebarMenu>
      <StyledSidebarMenu>
        <Logout />
        <CustomSidebarLink
          label={t('auth.logout')}
          isActive={false}
          to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`}
          onClick={() => {
            dispatch(logout());
          }}
        />
        
      </StyledSidebarMenu>
    </StyledSidebarCard>
  );
}

export default Sidebar;
