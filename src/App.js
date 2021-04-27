import {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChordCalculator from './components/ChordCalculator';
import ScaleCalculator from './components/ScaleCalculator';
import './App.css';

function App() {
  const [route, setRoute] = useState('/chords');

  function handleRouteChange(e, newValue) {
    setRoute(newValue);
  }

  return (
    <div className="App">
      <AppBar >
        <h1>Practice Room</h1>
        <Tabs 
          value={route} 
          onChange={handleRouteChange}
          centered>
          <Tab label="Chord Calculator" value="/chords" />
          <Tab label='Scale Calculator' value="/scales" />
        </Tabs>
      </AppBar >
      {(route === '/chords') ? <ChordCalculator className='content'/> : null}
      {(route === '/scales') ? <ScaleCalculator className='content'/> : null}
    </div>
    
  );
}

export default App;
