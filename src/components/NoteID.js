import { alphabet } from './musicConstants';
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Score from './Score';
import ClefSelect from './ClefSelect';
import FormControl from '@material-ui/core/FormControl';

export default function NoteID(props) {

    const [numAttempts, setNumAttempts] = useState(0);
    const [octaves, setOctaves] = useState(['4', '5']);
    const [notes, setNotes] = useState({
        vexStr: null,
        display: '',
        clef: 'treble',
        octave: '4',
    })
    const [numCorrect, setNumCorrect] = useState(0);
    const [currentNote, setCurrentNote] = useState(alphabet[Math.floor(Math.random() * (alphabet.length - 1))]);

    const changeClef = (e) => {
        let range = [4, 5];
        if (e.target.value === 'alto') {
            range = [3, 4];
        } else if (e.target.value === 'bass') {
            range = [2, 3]
        }
        setOctaves(range);
        setNotes({
            vexStr: currentNote + '4/w',
            display: '',
            clef: e.target.value,
            octave: range[Math.floor(Math.random() * 2)],
        })
    }
    const makeGuess = (e) => {
        setNumAttempts(numAttempts + 1)
        const newGuess = e.target.innerText;
        if (newGuess === currentNote) {
            const newNote = alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
            const newOctave = octaves[Math.floor(Math.random() * 2)];
            setNumCorrect(numCorrect + 1);
            setCurrentNote(newNote);
            setNotes({...notes,
                vexStr: newNote + newOctave + '/w',
                display: '',
                octave: newOctave,
            })
        }
    }

    useEffect(() => {
        const octave = octaves[Math.floor(Math.random() * 2)];
        setNotes({...notes,
            vexStr: currentNote + octave + '/w',
            display: '',
            octave: octave
        })
    }, [currentNote, octaves])
    return (
        <div className='content'>
            <h2>Note Identification</h2>
            <h3>Score</h3>
            <h3>{numCorrect} / {numAttempts}</h3>
            <FormControl style={{width: '120px'}}>
                <ClefSelect onChange={changeClef} />
            </FormControl>
            {(notes.vexStr !== null) ? <Score notes={notes} numNotes={1} /> : null}
            {alphabet.map(note => <Button variant='contained' onClick={makeGuess} color='primary'>{note}</Button>)}
        </div>
    )
}