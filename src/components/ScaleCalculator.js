import {useState} from 'react';
import Score from './Score';
import RootSelect from './RootSelect'
import ClefSelect from './ClefSelect';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { calculateScale } from './musicFunctions';
import { scaleTypes, modes } from './musicConstants';
import AccidentalSelect from './AccidentalSelect';
import * as Tone from 'tone';

const styles = {width: '33%'};

export default function ScaleCalculator() {
    const [notes, setNotes] = useState({
        vexStr: 'C4/w, D4, E4, F4, G4, A4, B4, C5',
        display: 'C D E F G A B C',
        clef: 'treble',
        accidental: 'natural',
    })

    const [clef, setClef] = useState('treble');
    const [root, setRoot] = useState('C');
    const [scaleType, setScaleType] = useState('major');
    const [accidental, setAccidental] = useState('natural');
    const [sound, setSound] = useState('off');
    const [mode, setMode] = useState(0);

    const handleClefChange = (e) => setClef(e.target.value);
    const handleRootChange = (e) => setRoot(e.target.value);
    const handleAccidentalChange = (e) => setAccidental(e.target.value);
    const handleScaleTypeChange = (e) => setScaleType(e.target.value);
    const handleSoundChange = (e) => setSound(e.target.value);
    const handleModeChange = (e) => setMode(e.target.value);

    const handleClick = () => {
        const scale = calculateScale(root, clef, accidental, scaleType, mode);
        setNotes(scale);
        if (sound !== 'off') {
            let timeStart = 0;
            let timeAdd = 0.5;
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
            const now = Tone.now()
            scale.toneArr.forEach(note => {
              synth.triggerAttackRelease(note, '4n', now + timeStart);
              timeStart += timeAdd;
            });
          }  
    }

    return (
        <div className="content">
            <h2>Scale Calculator</h2>
            <div style={{maxWidth: '600px', margin: 'auto'}}>
                <FormControl style={styles}>
                    <ClefSelect value={clef} onChange={handleClefChange} />
                </FormControl>
                <FormControl style={styles}>
                    <RootSelect value={root} onChange={handleRootChange} />
                </FormControl>
                <FormControl style={styles}>
                    <AccidentalSelect value={accidental} onChange={handleAccidentalChange} />
                </FormControl>
                <FormControl style={styles} >
                    <InputLabel id="scale-type-label">Scale type</InputLabel>
                    <Select value={scaleType} onChange={handleScaleTypeChange}>
                        {scaleTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl style={styles} >
                    <InputLabel id="mode-label">Mode</InputLabel>
                    <Select value={mode} onChange={handleModeChange}>
                        {scaleType === 'major' ? modes.major.map(mode => <MenuItem key={mode} value={modes.major.indexOf(mode)}>{mode}</MenuItem>) : null}
                        {scaleType === 'harmonic minor' ? modes.harmonicMinor.map(mode => <MenuItem key={mode} value={modes.harmonicMinor.indexOf(mode)}>{mode}</MenuItem>) : null}
                        {scaleType === 'melodic minor' ? modes.melodicMinor.map(mode => <MenuItem key={mode} value={modes.melodicMinor.indexOf(mode)}>{mode}</MenuItem>) : null}
                        {scaleType === 'harmonic major' ? modes.harmonicMinor.map(mode => <MenuItem key={mode} value={modes.harmonicMinor.indexOf(mode)}>{mode}</MenuItem>) : null}
                    </Select>
                </FormControl>
                <FormControl style={styles}>
                    <InputLabel id="sound-label">Sound</InputLabel>
                    <Select id="sound" labelId="sound-label" value={sound} onChange={handleSoundChange}>
                        <MenuItem value="off">off</MenuItem>
                        <MenuItem value="on">on</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button variant='contained' color='primary' onClick={handleClick}>Submit</Button>
            <Score notes={notes} numNotes="8" />
        </div>
    )
}