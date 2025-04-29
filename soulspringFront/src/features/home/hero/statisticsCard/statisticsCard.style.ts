import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

export const StatsCardRoot = styled(Stack)(({ theme }) => ({
  width: "220px",
  height: "180px",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  padding: "20px",
  background: `linear-gradient(45deg , ${theme.palette.primary.light} , ${theme.palette.common.white} )`,
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  [theme.breakpoints.down("xl")]: {
    width: "500px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "auto",
    margin: "15px",
    padding: "100px",
    height: "150px",
  },
  "&:hover": {
    transform: "translateY(-10px)",
  },
}));

export const BlueStatsCardRoot = styled(Stack)(({ theme }) => ({
  width: "220px",
  height: "180px",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  padding: "20px",
  background: `linear-gradient(45deg , ${theme.palette.secondary.light} , ${theme.palette.common.white} )`,
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  [theme.breakpoints.down("xl")]: {
    width: "500px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "auto",
    margin: "15px",
    padding: "100px",
    height: "150px",
  },
  "&:hover": {
    transform: "translateY(-10px)",
  },
}));
export const StatsCardsContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  gap: "100px",
  flexDirection: "row",
  justifyContent: "center",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    display: "block",
    margin: "15px auto",
  },
}));
export const StyledCardImage = styled("img")(({ theme }) => ({
  width: "100px",
  background: theme.palette.primary.light,
  borderRadius: "50%",
  padding: "10px",
  height: "100px",
  [theme.breakpoints.down("sm")]: {
    width: "50px",
  },
}));

export const BlueStyledCardImage = styled("img")(({ theme }) => ({
  width: "100px",
  background: theme.palette.secondary.light,
  borderRadius: "50%",
  padding: "10px",
  height: "100px",
  [theme.breakpoints.down("sm")]: {
    width: "50px",
  },
}));

export const StatsTypography = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
  flex: 1,
});
