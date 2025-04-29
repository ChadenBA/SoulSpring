import {
  BlueStatsCardRoot,
  BlueStyledCardImage,
  StatsCardRoot,
  StatsTypography,
  StyledCardImage,
} from "./statisticsCard.style";
import { StatsticsCardProps } from "./statisticsCard.type";

export default function StatsticsCard({
  image,
  label,
  isBlue,
}: StatsticsCardProps) {
  return (
    <>
      {isBlue ? (
        <BlueStatsCardRoot>
          <BlueStyledCardImage src={image} alt={label} />
          <StatsTypography>{label}</StatsTypography>
        </BlueStatsCardRoot>
      ) : (
        <StatsCardRoot>
          <StyledCardImage src={image} alt={label} />
          <StatsTypography>{label}</StatsTypography>
        </StatsCardRoot>
      )}
    </>
  );
}
