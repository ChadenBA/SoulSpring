import { UserStatusColorProps } from './UserStatusChip.type';

export const gerProfStatusChipColor = (status: 0 | 1 | undefined): UserStatusColorProps => {
  let userStatusColor: UserStatusColorProps = {
    label: getProfStatus(status || 0),
    color: 'primary',
  };
  switch (status) {
    case 1:
      userStatusColor = {
        ...userStatusColor,
        color: 'success',
      };
      break;

    case 0:
      userStatusColor = {
        ...userStatusColor,
        color: 'warning',
      };
      break;
    default:
      userStatusColor = {
        label: getProfStatus(status || 0),
        color: 'primary',
      };
  }
  return userStatusColor;
};

export const getProfStatus = (isActive: 0 | 1): string => {
  if (isActive) return 'users.active';
  return 'users.Pending';
};
