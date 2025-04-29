import { GREY } from "@config/colors/colors";
import { Avatar, styled } from "@mui/material";

export const InstructorAvatar = styled(Avatar)(() => ({
    border: `2px solid ${GREY.light}`,
    height: 40,
    width: 40,
  }))