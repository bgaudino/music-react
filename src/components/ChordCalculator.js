import {useState} from 'react';
import Score from './Score';
import {alphabet, chordQualities} from './musicConstants'
import { calculateChord } from './musicFunctions';
import * as Tone from 'tone';

import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const sevenths = ['major 7', 'dominant 7', 'minor 7', 'half-diminshed 7', 'diminished 7', 'minor-major 7'];

export default function ChordCalculator() {
  const [notes, setNotes] = useState({
    vexStr: '(C4 E4 G4)/w',
    display: 'C E G',
    clef: 'treble',
    toneArr: ['C4', 'E4', 'G4'],
  });
  const [sound, setSound] = useState('off');
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
    if (sound) {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const now = Tone.now()
      chord.toneArr.forEach(note => synth.triggerAttackRelease(note, '2n', now));
    }  
  }

  function handleSoundChange(e) {
    (e.target.value === 'on') ? setSound(true) : setSound(false);
  }

  function handleQualityChange(e) {
    setQuality(e.target.value);
  }

  const styles = {width: '16%'};
    return (
      <div className="content">
        <h2>Chord Calculator</h2>
        <FormControl style={styles} >
          <InputLabel id="clef-label">Clef</InputLabel>
          <Select labelId="clef-label" id="clef" value={clef} onChange={handleClefChange}>
            <MenuItem value="treble">Treble</MenuItem>
            <MenuItem value="alto">Alto</MenuItem>
            <MenuItem value="bass">Bass</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="root-label">Root</InputLabel>
          <Select labelId="root-label" id="root" value={root} onChange={handleRootChange}>
            {alphabet.map(note => <MenuItem value={note}>{note}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="accidental-label">Accidental</InputLabel>
          <Select id="accidental" labelId="accidental-label" value={accidental} onChange={handleAccidentalChange}>
            <MenuItem value="natural">natural</MenuItem>
            <MenuItem value="sharp">sharp</MenuItem>
            <MenuItem value="flat">flat</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="quality-label">Quality</InputLabel>
            <Select id="quality" labelId="quality-label" value={quality} onChange={handleQualityChange}>
              {chordQualities.map(quality => <MenuItem value={quality}>{quality}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="inverion-label">Inversion</InputLabel>
          <Select id="inversion" labelId="inversion-label" value={inversion} onChange={handleInversionChange}>
            <MenuItem value="0">Root position</MenuItem>
            <MenuItem value="1">1st inversion</MenuItem>
            <MenuItem value="2">2nd inversion</MenuItem>
            {sevenths.includes(quality) ? <MenuItem value="3">3rd inversion</MenuItem> : null}
          </Select>
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="sound-label">Sound</InputLabel>
          <Select id="sound" labelId="sound-label" value={sound} onChange={handleSoundChange}>
            <MenuItem value="off">off</MenuItem>
            <MenuItem value="on">on</MenuItem>
          </Select>
        </FormControl>
        <Button variant='contained' color='primary' onClick={handleClick}>Submit</Button>
        <Score notes={notes} />
      </div>
    );
  }
