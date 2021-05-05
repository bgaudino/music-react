import {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChordCalculator from './components/ChordCalculator';
import ScaleCalculator from './components/ScaleCalculator';
import IntervalCalculator from './components/IntervalCalculator';
import Leaderboard from './components/Leaderboard'
import './App.css';
import NoteID from './components/NoteID';

function App() {
  const [route, setRoute] = useState('/chords');

  function handleRouteChange(e, newValue) {
    setRoute(newValue);
  }

  return (
    <div className="App">
      <AppBar style={{backgroundColor: '#6441a5'}}>
        <h1>Practice Room 2.0</h1>
        <Tabs 
          value={route} 
          onChange={handleRouteChange}
          centered>
          <Tab label='Scales' value="/scales" />
          <Tab label='Intervals' value="/intervals" />
          <Tab label="Chords" value="/chords" />
          <Tab label='Note ID' value="/noteid" />
          <Tab label='Leaderboard' value="/leaderboard" />
        </Tabs>
      </AppBar >
      {(route === '/scales') ? <ScaleCalculator className='content'/> : null}
      {(route === '/intervals') ? <IntervalCalculator className='content'/> : null}
      {(route === '/chords') ? <ChordCalculator className='content'/> : null}
      {(route === '/noteid') ? <NoteID className='content' /> : null}
      {(route === '/leaderboard') ? <Leaderboard /> : null}
    </div>
    
  );
}

export default App;
