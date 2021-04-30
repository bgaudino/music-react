import { alphabet } from './musicConstants';
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Score from './Score';
import ClefSelect from './ClefSelect';
import FormControl from '@material-ui/core/FormControl';

export default function NoteID(props) {

    const [numAttempts, setNumAttempts] = useState(0);
    const [notes, setNotes] = useState({
        vexStr: null,
        display: '',
        clef: 'treble'
    })
    const [numCorrect, setNumCorrect] = useState(0);
    const [currentNote, setCurrentNote] = useState(alphabet[Math.floor(Math.random() * (alphabet.length - 1))]);

    const changeClef = (e) => {
        setNotes({
            vexStr: currentNote + '4/w',
            display: '',
            clef: e.target.value
        })
    }
    const makeGuess = (e) => {
        setNumAttempts(numAttempts + 1)
        const newGuess = e.target.innerText;
        if (newGuess === currentNote) {
            const newNote = alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
            setNumCorrect(numCorrect + 1);
            setCurrentNote(newNote);
            setNotes({
                vexStr: newNote + '4/w',
                display: '',
                clef: 'treble'
            })
        }
    }

    useEffect(() => {
        setNotes({
            vexStr: currentNote + '4/w',
            display: '',
            clef: 'treble'
        })
    }, [currentNote])
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