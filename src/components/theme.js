import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          fontFamily: "Nunito",
          textAlign: "center",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#6441a5",
      light: "#fafafa",
      mainGradient: "linear-gradient(to left, #6441a5, #2a0845)",
    },
    // ...
  },
});
