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

export default function Navbar() {
  const isTablet = useMediaQuery("(max-width: 900px)");

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
                style={{ color: theme.palette.primary.light }}
                to="/scale-calculator"
              >
                Scales
              </Link>
              <Link
                style={{ color: theme.palette.primary.light }}
                to="/interval-calculator"
              >
                Intervals
              </Link>
              <Link
                style={{ color: theme.palette.primary.light }}
                to="/chord-calculator"
              >
                Chords
              </Link>
              <Link
                style={{ color: theme.palette.primary.light }}
                to="/note-id"
              >
                Note ID
              </Link>
              <Link
                style={{ color: theme.palette.primary.light }}
                to="/interval-eartraining"
              >
                Ear Training
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
