import { styled, Stack } from "@mui/material";
import { RotatingImageProps } from "./Footer.type";
import { GLOBAL_VARIABLES } from "@config/constants/globalVariables";
import { ThemeModeEnum } from "@config/enums/theme.enum";

export const FooterContainer = styled(Stack)(({ theme }) => ({
  padding: "20px 200px",
  background:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.background.paper
      : `linear-gradient(0.25turn, ${theme.palette.primary.light},${theme.palette.primary.light}, ${theme.palette.secondary.light},${theme.palette.primary.light})`,

  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    display: "block",
    flexDirection: "column",
    padding: "10px 20px",
  },
  [theme.breakpoints.down("sm")]: {
    display: "block",
    flexDirection: "column",
    padding: "10px 20px",
  },
}));

export const RotatingImage = styled("img")(
  ({ theme }) =>
    ({ isfootervisible }: RotatingImageProps) => ({
      marginRight: "100px",
      animation:
        isfootervisible === GLOBAL_VARIABLES.TRUE_STRING
          ? "fadeInBottom 2s ease-in-out"
          : "none",

      [theme.breakpoints.down("md")]: {
        display: "none",
      },

      "@keyframes fadeInBottom": {
        from: { opacity: 0, transform: "translateX(50%)" },
        to: { opacity: 1 },
      },
    })
);
