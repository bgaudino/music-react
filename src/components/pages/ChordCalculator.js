import {useState} from 'react';
import Score from '../Score';
import RootSelect from '../forms/RootSelect';
import ClefSelect from '../forms/ClefSelect';
import AccidentalSelect from '../forms/AccidentalSelect';
import {chordQualities, sevenths} from '../../utils/musicConstants'
import {calculateChord} from '../../utils/musicFunctions';
import * as Tone from 'tone';

import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';


export default function ChordCalculator() {
  const [notes, setNotes] = useState({
    vexStr: '(C4 E4 G4)/w',
    display: 'C E G',
    clef: 'treble',
    toneArr: ['C4', 'E4', 'G4'],
  });
  const [sound, setSound] = useState('off');
  const [inversion, setInversion] = useState(0);
  const [clef, setClef] = useState('treble');
  const [root, setRoot] = useState('C');
  const [quality, setQuality] = useState('major');
  const [accidental, setAccidental] = useState('natural');

  const handleAccidentalChange = (e) => setAccidental(e.target.value);
  const handleClefChange = (e) => setClef(e.target.value);
  const handleInversionChange = (e) => setInversion(e.target.value);
  const handleRootChange = (e) => setRoot(e.target.value);
  const handleSoundChange = (e) => setSound(e.target.value);
  const handleQualityChange = (e) => setQuality(e.target.value);

  const handleClick = () => {
    const chord = calculateChord(root, accidental, quality, clef, inversion)
    setNotes(chord);
    if (sound !== 'off') {
      let timeStart = 0;
      let timeAdd = null;
      (sound === 'arpeggio') ? timeAdd = 0.5 : timeAdd = 0;
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const now = Tone.now()
      chord.toneArr.forEach(note => {
        synth.triggerAttackRelease(note, '2n', now + timeStart);
        timeStart += timeAdd;
      });
    }  
  }

  const styles = {width: '33%'};

    return (
      <div className="content">
        <h2>Chord Calculator</h2>
        <div style={{maxWidth: '600px', margin: 'auto'}}>
        <FormControl style={styles} >
          <ClefSelect value={clef} onChange={handleClefChange} />
        </FormControl>
        <FormControl style={styles} >
          <RootSelect value={root} onChange={handleRootChange}/>
        </FormControl>
        <FormControl style={styles} >
          <AccidentalSelect value={accidental} onChange={handleAccidentalChange} />
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="quality-label">Quality</InputLabel>
            <Select id="quality" labelId="quality-label" value={quality} onChange={handleQualityChange}>
              {chordQualities.map(quality => <MenuItem key={quality} value={quality}>{quality}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="inverion-label">Inversion</InputLabel>
          <Select id="inversion" labelId="inversion-label" value={inversion} onChange={handleInversionChange}>
            <MenuItem value={0}>root position</MenuItem>
            <MenuItem value={1}>1st inversion</MenuItem>
            <MenuItem value={2}>2nd inversion</MenuItem>
            {sevenths.includes(quality) ? <MenuItem value={3}>3rd inversion</MenuItem> : null}
          </Select>
        </FormControl>
        <FormControl style={styles} >
          <InputLabel id="sound-label">Sound</InputLabel>
          <Select id="sound" labelId="sound-label" value={sound} onChange={handleSoundChange}>
            <MenuItem value="off">off</MenuItem>
            <MenuItem value="chord">chord</MenuItem>
            <MenuItem value="arpeggio">arpeggio</MenuItem>
          </Select>
        </FormControl>
        </div>
        <Button variant='contained' color='primary' onClick={handleClick}>Calculate</Button>
        <Score notes={notes} numNotes="1"/>
      </div>
    );
  }
