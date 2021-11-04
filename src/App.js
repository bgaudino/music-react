import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ChordCalculator from "./components/ChordCalculator";
import ScaleCalculator from "./components/ScaleCalculator";
import IntervalCalculator from "./components/IntervalCalculator";
import IntervalET from "./components/IntervalET";
import Leaderboard from "./components/Leaderboard";
import "./App.css";
import NoteID from "./components/NoteID";
import SimpleMenu from "./components/SimpleMenu";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";

function App() {
  const [route, setRoute] = useState("Scale Calculator");
  const [game, setGame] = useState("");
  function handleRouteChange(e, newValue) {
    setRoute(newValue);
  }

  function onClick(e) {
    if (e.target.innerText) setRoute(e.target.innerText);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar
          style={{
            backgroundImage: "linear-gradient(to right, #6441a5, #2a0845)",
          }}
        >
          <h1>Practice Room 2.0</h1>
          <Tabs id="tabs" value={route} onChange={handleRouteChange} centered>
            <Link to="/scale-calculator">
              <Tab label="Scales" value="Scale Calculator" />
            </Link>
            <Link color="primary" to="/interval-calculator">
              <Tab label="Intervals" value="Interval Calculator" />
            </Link>
            <Link to="/chord-calculator">
              <Tab label="Chords" value="Chord Calculator" />
            </Link>
            <Link to="/note-id">
              <Tab label="Note ID" value="Note Identification" />
            </Link>
            <Link to="/interval-eartraining">
              <Tab label="Eartraining" value="Interval Eartraining" />
            </Link>
            <Link to="/leaderboard">
              <Tab label="Leaderboard" value="Leaderboard" />
            </Link>
          </Tabs>
          <SimpleMenu onClick={onClick} />
        </AppBar>
        <Switch>
          <Route path="/scale-calculator" component={ScaleCalculator} />
          <Route path="/interval-calculator" component={IntervalCalculator} />
          <Route path="/chord-calculator" component={ChordCalculator} />
          <Route path="/note-id" component={NoteID} />
          <Route path="/interval-eartraining" component={IntervalET} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Redirect from="/" to="/scale-calculator" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
