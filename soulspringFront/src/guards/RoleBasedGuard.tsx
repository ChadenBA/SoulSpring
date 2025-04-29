import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import { UserRoleEnum } from '@config/enums/role.enum' // Ensure this path is correct

interface RoleBasedGuardProps {
  accessibleRoles: UserRoleEnum // Change type to string-based UserRoleEnum
  children: ReactNode
}

export function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProps) {
  const user = getUserFromLocalStorage()

  if (!user) {
    return <Navigate to={PATHS.ROOT} replace />
  }

  // Ensure user.role is of type UserRoleEnum
  if (!accessibleRoles.includes(user.role as UserRoleEnum)) {
    return <Navigate to={PATHS.MAIN.ERROR.P_403} replace />
  }

  return <>{children}</>
}
