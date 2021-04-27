import {useState, useEffect} from 'react';
import Score from './Score';
import RootSelect from './RootSelect'
import ClefSelect from './ClefSelect';

export default function ScaleCalculator() {
    const [notes, setNotes] = useState({
        vexStr: 'C4/w, D4, E4, F4, G4, A4, B4, C5',
        display: 'C D E F G A B C',
        clef: 'treble',
    })
    const [clef, setClef] = useState('treble')
    const [root, setRoot] = useState('C')

    function handleClefChange(e) {
        setClef(e.target.value);
    }
    function handleRootChange(e) {
        setRoot(e.target.value);
    }
    return (
        <div className="content">
            <RootSelect value={root} onChange={handleRootChange} />
            <ClefSelect value={clef} onChange={handleClefChange} />
            <Score notes={notes} numNotes="8" />
        </div>
    )
}