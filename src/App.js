import {useState} from 'react';
import ChordCalculator from './components/ChordCalculator';
import './App.css';


function App() {
  const [size, setSize] = useState(true);

  function toggleSize() {
    setSize(!size);
  }

  if (size) {
    return (
      <div className="App">
        <button onClick={toggleSize}>Toggle</button>
        <ChordCalculator />
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>Seventh Chords: TODO</div>
        <button onClick={toggleSize}>back to triads</button>
      </div>
    )
  }
  
}

export default App;
