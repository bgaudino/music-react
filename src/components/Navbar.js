import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SimpleMenu from "./SimpleMenu";

export default function Navbar() {
  const isTablet = useMediaQuery("(max-width: 900px)");

  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="lg">
        <Toolbar>
          {isTablet && <SimpleMenu />}
          <Link
            to="/scale-calculator"
            style={{ textDecoration: "unset", color: "unset" }}
          >
            <h2 style={{ cursor: "pointer" }}>
              Practice Room
            </h2>
          </Link>
          {!isTablet && (
            <Box
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Link to="/scale-calculator">Scales</Link>
              <Link to="/interval-calculator">Intervals</Link>
              <Link to="/chord-calculator">Chords</Link>
              <Link to="/note-id">Note ID</Link>
              <Link to="/interval-eartraining">Ear Training</Link>
              <Link to="/leaderboard">Leaderboard</Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
