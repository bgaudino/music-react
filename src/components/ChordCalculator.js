import {useState} from 'react';
import Score from './Score';
import {alphabet, triadQualities} from './musicConstants'
import { calculateChord } from './musicFunctions';

const sevenths = ['major 7', 'dominant 7', 'minor 7', 'half-diminshed 7', 'diminished 7', 'minor-major 7'];

export default function ChordCalculator() {
  const [notes, setNotes] = useState({
    vexStr: '(C4 E4 G4)/w',
    display: 'C E G',
    clef: 'treble',
    toneArr: ['C4', 'E4', 'G4'],
  });
  const [inversion, setInversion] = useState('0');
  const [clef, setClef] = useState('treble');
  const [root, setRoot] = useState('C');
  const [quality, setQuality] = useState('major');
  const [accidental, setAccidental] = useState('natural');

  function handleAccidentalChange(e) {
    setAccidental(e.target.value);
  }

  function handleClefChange(e) {
    setClef(e.target.value);
  }

  function handleRootChange(e) {
    setRoot(e.target.value);
  }

  function handleInversionChange(e) {
    setInversion(e.target.value);
  }

  function handleClick() {
    const chord = calculateChord(root, accidental, quality, clef, inversion)
    setNotes(chord);

  }

  function handleQualityChange(e) {
    setQuality(e.target.value);
  }

    return (
      <div className="content">
        <h2>Chord Calculator</h2>
        <div className="input-group form">
            <span className="input-group-text">Clef:</span>
            <select className="form-select" onChange={handleClefChange}>
              <option value="treble">Treble</option>
              <option value="alto">Alto</option>
              <option value="bass">Bass</option>
            </select>
        </div>
        <div className="input-group form">
            <span className="input-group-text">Root:</span>
            <select className="form-select" onChange={handleRootChange}>
              {alphabet.map(note => <option value={note}>{note}</option>)}
            </select>
            <span className="input-group-text">Accidental:</span>
            <select className="form-select" onChange={handleAccidentalChange}>
              <option value="natural">♮</option>
              <option value="sharp">♯</option>
              <option value="flat">♭</option>
            </select>
        </div>
        <div className="input-group form">
            <span className="input-group-text">Inversion:</span>
            <select class="form-select" onChange={handleInversionChange}>
              <option value="0">Root position</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              {sevenths.includes(quality) ? <option value="3">3rd</option> : false}
            </select>
            <span className="input-group-text">Quality:</span>
            <select className="form-select" onChange={handleQualityChange}>
              {triadQualities.map(quality => <option value={quality}>{quality}</option>)}
            </select>
            <button className="btn btn-primary" onClick={handleClick}>Submit</button>
        </div>
        <Score notes={notes} />
      </div>
    );
  }
