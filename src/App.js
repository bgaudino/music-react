import ChordCalculator from "./components/pages/ChordCalculator";
import ScaleCalculator from "./components/pages/ScaleCalculator";
import IntervalCalculator from "./components/pages/IntervalCalculator";
import IntervalET from "./components/pages/IntervalET";
import NoteID from "./components/pages/NoteID";
import { Container, Grid, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./components/Navbar";
import { theme } from "./components/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Container maxWidth="sm">
            <Grid container spacing={3}>
              <Route path="/scale-calculator" component={ScaleCalculator} />
              <Route
                path="/interval-calculator"
                component={IntervalCalculator}
              />
              <Route path="/chord-calculator" component={ChordCalculator} />
              <Route path="/note-id" component={NoteID} />
              <Route path="/interval-eartraining" component={IntervalET} />
              <Route path="/" exact component={ScaleCalculator} />
            </Grid>
          </Container>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
