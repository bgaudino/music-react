import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import ChordCalculator from './components/ChordCalculator';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>Practice Room</h1>
          <ul>
            <li>
              <Link to="/chords">Chord Calculator</Link>
            </li>
            <li>
              <Link to="/nothing">Nothing</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/chords">
          <ChordCalculator />
        </Route>
        <Route path="/nothing">
          <div>Nothing here</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
