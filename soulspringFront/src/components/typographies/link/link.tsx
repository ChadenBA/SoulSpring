import { LinkStyled } from './link.style';
import { LinkProps } from './link.type';

function Link({ children, onClick }: LinkProps) {
  return <LinkStyled onClick={onClick}>{children}</LinkStyled>;
}

export default Link;
