import {useState} from 'react';
import Score from './Score';
import {alphabet, triadQualities} from './musicConstants'
import { calculateChord } from './musicFunctions';



export default function ChordCalculator() {
  const [notes, setNotes] = useState({
    vexStr: '(C4 E4 G4)/w',
    display: 'C E G',
  });
  const [root, setRoot] = useState('C');
  const [quality, setQuality] = useState('major');
  const [accidental, setAccidental] = useState('natural');

  function handleAccidentalChange(e) {
    setAccidental(e.target.value);
  }

  function handleRootChange(e) {
    setRoot(e.target.value);
  }

  function handleClick() {
    const chord = calculateChord(root, accidental, quality)
    setNotes(chord);
  }

  function handleQualityChange(e) {
    setQuality(e.target.value);
  }

    return (
        <div className="content">
            <h2>Chord Calculator</h2>
            <div className="input-group form">
                <span class="input-group-text">Root:</span>
                <select className="form-select" onChange={handleRootChange}>
                {alphabet.map(note => <option value={note}>{note}</option>)}
                </select>
                <span class="input-group-text">Accidental:</span>
                <select className="form-select" onChange={handleAccidentalChange}>
                <option value="natural">♮</option>
                <option value="sharp">♯</option>
                <option value="flat">♭</option>
                </select>
                <span class="input-group-text">Quality:</span>
                <select className="form-select" onChange={handleQualityChange}>
                {triadQualities.map(quality => <option value={quality}>{quality}</option>)}
                </select>
                <button className="btn btn-primary" onClick={handleClick}>Submit</button>
            </div>
            <Score notes={notes} />
        </div>
    );
  }
