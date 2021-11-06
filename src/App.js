import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import ChordCalculator from "./components/pages/ChordCalculator";
import ScaleCalculator from "./components/pages/ScaleCalculator";
import IntervalCalculator from "./components/pages/IntervalCalculator";
import IntervalET from "./components/pages/IntervalET";
import Leaderboard from "./components/pages/Leaderboard";
import NoteID from "./components/pages/NoteID";
import Layout from "./components/Layout";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff00ff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Layout>
            <Route path="/scale-calculator" component={ScaleCalculator} />
            <Route path="/interval-calculator" component={IntervalCalculator} />
            <Route path="/chord-calculator" component={ChordCalculator} />
            <Route path="/note-id" component={NoteID} />
            <Route path="/interval-eartraining" component={IntervalET} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Redirect from="/" to="/scale-calculator" />
          </Layout>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
