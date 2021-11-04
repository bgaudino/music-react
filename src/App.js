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
  const [value, setValue] = useState("Scale Calculator");

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar
          style={{
            backgroundImage: "linear-gradient(to right, #6441a5, #2a0845)",
          }}
        >
          <h1>Practice Room 2.0</h1>
          <Tabs id="tabs" centered>
            <Link to="/scale-calculator">
              <Tab
                selected={value === "Scale Calculator"}
                label="Scales"
                value="Scale Calculator"
                onChange={() => setValue("Scale Calculator")}
              />
            </Link>
            <Link color="primary" to="/interval-calculator">
              <Tab
                selected={value === "Interval Calculator"}
                label="Intervals"
                value="Interval Calculator"
                onChange={() => setValue("Interval Calculator")}
              />
            </Link>
            <Link to="/chord-calculator">
              <Tab
                selected={value === "Chord Calculator"}
                label="Chords"
                value="Chord Calculator"
                onChange={() => setValue("Chord Calculator")}
              />
            </Link>
            <Link to="/note-id">
              <Tab
                selected={value === "Note Identification"}
                label="Note ID"
                value="Note Identification"
                onChange={() => setValue("Note Identification")}
              />
            </Link>
            <Link to="/interval-eartraining">
              <Tab
                selected={value === "Interval Eartraining"}
                label="Eartraining"
                value="Interval Eartraining"
                onChange={() => setValue("Interval Eartraining")}
              />
            </Link>
            <Link to="/leaderboard">
              <Tab
                selected={value === "Leaderboard"}
                label="Leaderboard"
                value="Leaderboard"
                onChange={() => setValue("Leaderboard")}
              />
            </Link>
          </Tabs>
          <SimpleMenu />
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
