import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SimpleMenu from "./SimpleMenu";
import { theme } from "./theme";
import { useLocation } from "react-router";

export default function Navbar() {
  const isTablet = useMediaQuery("(max-width: 900px)");
  const location = useLocation();

  function getStyles(path) {
    const styles = {
      color: theme.palette.primary.light,
      textDecoration: "none",
      fontWeight: "unset",
      transform: "scale(1)",
    };
    if (location.pathname === path) {
      styles.fontWeight = "bold";
      styles.transform = "scale(1.1)";
    }
    return styles;
  }

  return (
    <AppBar
      style={{ background: theme.palette.primary.mainGradient }}
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar>
          {isTablet && <SimpleMenu />}
          <Link
            to="/scale-calculator"
            style={{ textDecoration: "unset", color: "unset" }}
          >
            <h2 style={{ cursor: "pointer" }}>Practice Room</h2>
          </Link>
          {!isTablet && (
            <Box
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Link
                style={getStyles("/scale-calculator")}
                to="/scale-calculator"
              >
                Scales
              </Link>
              <Link
                style={getStyles("/interval-calculator")}
                to="/interval-calculator"
              >
                Intervals
              </Link>
              <Link
                style={getStyles("/chord-calculator")}
                to="/chord-calculator"
              >
                Chords
              </Link>
              <Link style={getStyles("/note-id")} to="/note-id">
                Note ID
              </Link>
              <Link
                style={getStyles("/interval-eartraining")}
                to="/interval-eartraining"
              >
                Ear Training
              </Link>
              <Link style={getStyles("/leaderboard")} to="/leaderboard">
                Leaderboard
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
