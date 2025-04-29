import { MouseEvent } from 'react';
import { CustomLinkProps } from './CustomLink.type';
import { CustomLinkRoot } from './customLink.style';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';

const CustomLink = ({ to, label, isActive, disabled }: CustomLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
    }
  };
  return (
    <CustomLinkRoot
      to={to}
      isPending={disabled ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
      isactive={isActive ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
      onClick={handleClick}
    >
      {label}
    </CustomLinkRoot>
  );
};

export default CustomLink;
