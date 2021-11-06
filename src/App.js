import ChordCalculator from "./components/pages/ChordCalculator";
import ScaleCalculator from "./components/pages/ScaleCalculator";
import IntervalCalculator from "./components/pages/IntervalCalculator";
import IntervalET from "./components/pages/IntervalET";
import Leaderboard from "./components/pages/Leaderboard";
import NoteID from "./components/pages/NoteID";
import { Container, Grid } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Switch>
            <Route path="/scale-calculator" component={ScaleCalculator} />
            <Route path="/interval-calculator" component={IntervalCalculator} />
            <Route path="/chord-calculator" component={ChordCalculator} />
            <Route path="/note-id" component={NoteID} />
            <Route path="/interval-eartraining" component={IntervalET} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Redirect from="/" to="/scale-calculator" />
          </Switch>
        </Grid>
      </Container>
    </BrowserRouter>
  );
}

export default App;
