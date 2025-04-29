import { Stack, Typography, useTheme } from "@mui/material";
import logo from "@assets/logo/logo-no-background.png";
import logo_dark from "@assets/logo/logo-white.png";
import { useTranslation } from "react-i18next";
import { ThemeModeEnum } from "@config/enums/theme.enum";

function AuthHeader({ title }: { title: string }) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction={{ md: "column", lg: "row" }}
        justifyContent={"space-between"}
        alignItems={{ md: "flex-start", lg: "center" }}
        gap={2}
      >
        <img
          src={theme.palette.mode === ThemeModeEnum.LIGHT ? logo : logo_dark}
          alt="logo"
          width={150}
        />
      </Stack>

      <Typography variant="h1">{t(title)}</Typography>
    </Stack>
  );
}

export default AuthHeader;
