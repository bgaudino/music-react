import {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChordCalculator from './components/ChordCalculator';
import ScaleCalculator from './components/ScaleCalculator';
import IntervalCalculator from './components/IntervalCalculator';
import IntervalET from './components/IntervalET';
import Leaderboard from './components/Leaderboard'
import './App.css';
import NoteID from './components/NoteID';
import SimpleMenu from './components/SimpleMenu';

function App() {
  const [route, setRoute] = useState('Scale Calculator');
  const [game, setGame] = useState('');
  function handleRouteChange(e, newValue) {
    setRoute(newValue);
  }

  function onClick(e) {
    if (e.target.innerText) setRoute(e.target.innerText);
  }

  return (
    <div className="App">
      <AppBar style={{backgroundImage: 'linear-gradient(to right, #6441a5, #2a0845)'}}>
        <h1>Practice Room 2.0</h1>
        <Tabs id="tabs"
          value={route} 
          onChange={handleRouteChange}
          centered>
          <Tab label='Scales' value="Scale Calculator" />
          <Tab label='Intervals' value="Interval Calculator" />
          <Tab label="Chords" value="Chord Calculator" />
          <Tab label='Note ID' value="Note Identification" />
          <Tab label='Eartraining' value="Interval Eartraining" />
          <Tab label='Leaderboard' value="Leaderboard" />
        </Tabs> 
        <SimpleMenu onClick={onClick} />

      </AppBar >
      
      {(route === 'Scale Calculator') ? <ScaleCalculator className='content'/> : null}
      {(route === 'Interval Calculator') ? <IntervalCalculator className='content'/> : null}
      {(route === 'Chord Calculator') ? <ChordCalculator className='content'/> : null}
      {(route === 'Note Identification') ? <NoteID setRoute={setRoute} setGame={setGame} className='content' /> : null}
      {(route === 'Interval Eartraining') ? <IntervalET setRoute={setRoute} setGame={setGame} className='content' />:  null}
      {(route === 'Leaderboard') ? <Leaderboard game={game}/> : null}

    </div>
    
  );
}

export default App;
