import { useState } from 'react';
import { intervals } from './musicConstants';
import { Button } from '@material-ui/core';
import { randomInterval } from './musicFunctions';
import TextField from '@material-ui/core/TextField';
import * as Tone from 'tone';

const btnStyle = {
    textTransform: 'none'
};
const scoreStyles = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center'
}

const IntervalButtons = (props) => {
    return (
        <div>
            {props.intervals.map(interval => {
                return (
                    <Button variant="contained" color="primary" style={btnStyle} onClick={() => props.onClick(interval, props.intervals)}>{interval}</Button>
                );
            })}
        </div>
    )
}

export default function IntervalET(props) {
    const [interval, setInterval] = useState(null);
    const [score, setScore] = useState({
        numCorrect: 0,
        numAttempts: 0,
        pct: 0,
    })
    const [name, setName] = useState('');
    const [notes, setNotes] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [emoji, setEmoji] = useState(null);

    const play = notes => {
        let timeStart = 0;
        let timeAdd = 0.5;
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now();
        notes.forEach(note => {
            synth.triggerAttackRelease(note, '4n', now + timeStart);
            timeStart += timeAdd;
        });
    }
    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onClick = (item, list) => {
        const updatedAttempts = score.numAttempts + 1;
        const guess = list.indexOf(item);

        let pct = null;
        if (guess === interval) {
            const updatedCorrect = score.numCorrect + 1;
            pct = Math.round((updatedCorrect / updatedAttempts) * 100)
            setScore({
                numCorrect: updatedCorrect,
                numAttempts: updatedAttempts,
                pct: pct,
            })
            const result = randomInterval();
            setInterval(result.interval);
            play(result.notes);
            setNotes(result.notes);
        } else {
            pct = Math.round((score.numCorrect / updatedAttempts) * 100);
            setScore({
                numCorrect: score.numCorrect,
                numAttempts: updatedAttempts,
                pct: Math.round((score.numCorrect / updatedAttempts) * 100),
            })
        }

        if (pct > 90) setEmoji('😁');
        else if (pct > 80) setEmoji('😀');
        else if (pct > 70) setEmoji('😐');
        else if (pct > 60) setEmoji('😟');
        else setEmoji('😭');
    }

    const start = () => {
        setIsStarted(true);
        const result = randomInterval();
        setInterval(result.interval);
        setNotes(result.notes);
        let timeStart = 0;
        let timeAdd = 0.5;
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now()
        result.notes.forEach(note => {
            synth.triggerAttackRelease(note, '4n', now + timeStart);
            timeStart += timeAdd;
        });
    }

    const submitScore = () => {
        const finalScore = {
            name: name,
            numCorrect: score.numCorrect,
            numAttempts: score.numAttempts,
            pct: score.pct,
            game: 'Interval ET',
        }

        fetch('https://sheet.best/api/sheets/fa8cefd4-9b56-41da-8404-f1bb6419f02c', {
            method: 'POST',
            headers: {
                'X-API-KEY': 'Rj-G_Fdl-q#fRaEaaC299_ThGg-0zS4HcDWQ4ky3w5J1MmeJ6t-U5rY0adfa8qnG',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalScore)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            props.setGame('Interval ET');
            props.setRoute('Leaderboard');
        })
        .catch(error => console.log(error));

        setName('');
        setScore({
            numCorrect: 0,
            numAttempts: 0,
            pct: 0, 
        })
    }

    return (
        <div className="content">
            <h2>Interval Ear Training</h2>
            <h3 style={scoreStyles}>
                <span>Score:</span>
                <span>{score.numCorrect} / {score.numAttempts}</span>
                <span>{score.pct}%</span>
                <span>{emoji}</span>
            </h3>
            {(!isStarted) ? <div><Button variant="contained" color="primary" onClick={start}>Start</Button></div> : <IntervalButtons intervals={intervals.abbreviations} onClick={onClick} />}
            {(isStarted) ?
                <div>
                    <div>
                    <Button variant="contained" color="primary" style={btnStyle} onClick={() => play(notes)}>Play again</Button>
                    </div>
                    <div> 
                        <TextField value={name} onChange={onNameChange}id="standard-basic" label="Name" />
                        <Button onClick={submitScore} variant="contained" color="primary">Submit Score</Button>
                    </div>
                </div> 
                : null }
        </div>
    );
}
