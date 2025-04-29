import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '@redux/slices/authSlice';
import { PATHS } from '@config/constants/paths';
import { UserRoleEnum } from '@config/enums/role.enum';

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, user } = useSelector(selectAuth);

  const isNotApprovedProfessional =
    user?.role === UserRoleEnum.PROFESSIONAL &&
    user?.isApproved === false;


  if (isNotApprovedProfessional) {
    setTimeout(() => {
      return <Navigate to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`} replace />;
    }, 100);
  }
  

  if (isAuthenticated && user?.role === UserRoleEnum.ADMIN) {
    return <Navigate to={PATHS.DASHBOARD.ADMIN.ROOT} replace />;
  }

  if (isAuthenticated && user?.role === UserRoleEnum.USER) {
    return user.hasCompletedTest
      ? <Navigate to={PATHS.DASHBOARD.STUDENT.ROOT} replace />
      : <Navigate to={PATHS.Test_diagnose.test} replace />;
  }

  if (
    isAuthenticated &&
    user?.role === UserRoleEnum.PROFESSIONAL &&
    user?.isApproved === true
  ) {
    return <Navigate to={PATHS.DASHBOARD.PROFESSIONAL.ROOT} replace />;
  }

  return <>{children}</>;
}
