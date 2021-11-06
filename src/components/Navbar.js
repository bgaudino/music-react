import {
  AppBar,
  Box,
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
      <Toolbar>
        {isTablet && <SimpleMenu />}
        <Link to="/scale-calculator" style={{ textDecoration: "unset", color: "unset" }}>
          <Typography
            variant="h6"
            style={{ cursor: "pointer" }}
            // onClick={() => window.location.assign("/")}
          >
            Practice Room
          </Typography>
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
    </AppBar>
  );
}
