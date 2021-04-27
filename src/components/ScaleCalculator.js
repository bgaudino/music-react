import {useState, useEffect} from 'react';
import Score from './Score';

export default function ScaleCalculator() {
    const [notes] = useState({
        vexStr: 'C4/w, D4, E4, F4, G4, A4, B4, C5',
        display: 'C D E F G A B C',
        clef: 'treble',
    })



    return (
        <Score notes={notes} numNotes="8" />
    )
}