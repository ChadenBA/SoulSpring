import { PATHS } from '@config/constants/paths';
import { useAppSelector } from '@redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function TestGuard({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  const hasCompletedTest = useAppSelector((state) => state.auth.hasCompletedTest); 
console.log(user)
  if (user?.hasCompletedTest == false && hasCompletedTest === false) {
    return <Navigate to={PATHS.Test_diagnose.test} replace />;
  }

  return <>{children}</>;
}
