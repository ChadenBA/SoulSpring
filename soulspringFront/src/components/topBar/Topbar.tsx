import { useState, useEffect, MouseEvent } from 'react';
import {
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@config/constants/paths';
import CustomLink from '@components/customLink/CustomLink';
import CustomIconButton from '@components/buttons/customIconButton/CustomIconButton';
import LanguageSwitcher from '@components/languageSwitcher/LanguageSwitcher';
import lernado_dark from '@assets/logo/logo-white.png';
import lernado from '@assets/logo/logo-no-background.png';
import { ThemeModeEnum } from '@config/enums/theme.enum';
import TopbarDrawer from './topbarDrawer/TopbarDrawer';
import { TopBarProps } from './topbar.type';
import { LogoAvatar, StyledMenu, StyledMenuItem, TopBarContainer, UserTitle } from './Topbar.style';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { logout } from '@redux/slices/authSlice';
import { getUserRole } from '@utils/helpers/userRole.helpers';
import { getUserInitials } from '@utils/helpers/string.helpers';
import { GREY } from '@config/colors/colors';
import { Dashboard, Logout } from '@mui/icons-material';
import { UserRoleEnum } from '@config/enums/role.enum';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { changeTheme } from '@redux/slices/theme';
import { InstructorAvatar } from '@features/home/userAvatar/UserAvatar.style';

export const TopBar = ({ items }: TopBarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
 // const media = useAppSelector((state) => state.auth.media);
  const isHomePage = location.pathname === PATHS.ROOT;

  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

 // const disabled = user?.coursesCount === 0;

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isDarkMode } = useAppSelector((state) => state.theme);
  const chnageThemeHandler = () =>
    dispatch(changeTheme(isDarkMode ? ThemeModeEnum.LIGHT : ThemeModeEnum.DARK));

  // Filter items based on the user role
  const filteredItems = items.filter((item) => {
     if (item.id === 5 && user?.role !== UserRoleEnum.PROFESSIONAL) {
     return true;
    }
     return true;
   });

  return (
    <TopBarContainer
      isscrolled={isScrolled ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
      ishomepage={isHomePage ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
    >
      <LogoAvatar
         sx={{ cursor: 'pointer' }}
         onClick={
          user?.role === UserRoleEnum.ADMIN ||
           user?.role === UserRoleEnum.PROFESSIONAL 
          // ||
          // (user?.role === UserRoleEnum.USER && user?.coursesCount != 0)
            ? () => navigate(PATHS.ROOT)
            : () => navigate(PATHS.SECOND_STEP.CATEGORIES)
        }
        alt={GLOBAL_VARIABLES.APP_NAME}
        src={theme.palette.mode === ThemeModeEnum.LIGHT ? lernado : lernado_dark}
        variant="square"
      />

      {isMobile ? (
        <CustomIconButton color="primary" onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </CustomIconButton>
      ) : (
        <Stack direction="row" spacing={4}>
          {filteredItems.map((item) => (
            <CustomLink
              key={item.id}
              label={t(item.label)}
              to={item.path}
              isActive={item.path === location.pathname}
              // disabled={disabled}
            />
          ))} 
        </Stack>
      )}

      <Stack direction="row" alignItems="center" spacing={2}>
        <LanguageSwitcher />
        <CustomIconButton color="primary" onClick={chnageThemeHandler}>
          {isDarkMode ? <Brightness5OutlinedIcon /> : <DarkModeOutlinedIcon />}
        </CustomIconButton>

        {!!user ? (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ height: 40, width: 40 }}>
              <InstructorAvatar
                alt={user?.firstName}
                // src={?.fileName}
                sx={{ cursor: 'pointer' }}
              >
                {getUserInitials(user)}
              </InstructorAvatar>
            </IconButton>

            <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <UserTitle>{user?.firstName}</UserTitle>
              <Typography color={GREY.main} fontSize={'0.75rem'} margin={1}>
                {/* {t(getUserRole(user.role))} */}
              </Typography>

              <Divider />

              <StyledMenuItem
 // disabled={user?.role === UserRoleEnum.USER && user?.coursesCount === 0}
  onClick={() => {
    console.log(user?.role);

    if (user?.role === UserRoleEnum.ADMIN) {
      navigate(PATHS.DASHBOARD.ADMIN.ROOT);
    } else if (user?.role === UserRoleEnum.USER) {
      navigate(PATHS.DASHBOARD.STUDENT.ROOT);  // Ensure this path exists
    } else {
      navigate(PATHS.DASHBOARD.PROFESSIONAL.ROOT);
    }
  }}
  
>
  <ListItemIcon>
    <Dashboard />
  </ListItemIcon>
  <ListItemText>{t('dashboard.dashboard')}</ListItemText>
</StyledMenuItem>

              <StyledMenuItem
                onClick={() => {
                  dispatch(logout());
                  navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`);
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>{t('auth.logout')}</ListItemText>
              </StyledMenuItem>
            </StyledMenu>
          </>
        ) : (
          <>
            {!isMobile && (
              <>
                <Button
                  variant="contained"
                  sx={{ color: 'white' }}
                  onClick={() =>
                    navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`, {
                      replace: true,
                    })
                  }
                >
                  {t('topbar.signup')}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`, {
                      replace: true,
                    })
                  }
                >
                  {t('topbar.login')}
                </Button>
              </>
            )}
          </>
        )}
      </Stack>

      <TopbarDrawer open={open} toggleDrawer={toggleDrawer} />
    </TopBarContainer>
  );
};
