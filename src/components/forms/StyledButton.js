import { Button, styled } from "@material-ui/core";

const isMobile = window.innerWidth < 600;

export const StyledButton = styled(Button)({
  border: 0,
  borderRadius: 0,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  margin: isMobile ? 0 : "0 0.5rem",
});
