import { UserHeaderProps } from './UserHeader.type';
import { StyledDescription, StyledGrid, StyledHeader, StyledImage, StyledTitle } from './UserHeader.style';
import { Grid } from '@mui/material';

function UserHeader({ image, title, description }: UserHeaderProps) {
  return (
    <StyledHeader>
      <StyledGrid container>
        <Grid item xs={6}>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>{description}</StyledDescription>
        </Grid>
        <Grid item xs={6}>
          <StyledImage src={image} alt={title} />
        </Grid>
      </StyledGrid>
    </StyledHeader>
  );
}

export default UserHeader;
