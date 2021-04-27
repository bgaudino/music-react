import {useEffect} from 'react';
import Vex from 'vexflow';
import * as Tone from 'tone';

import './Score.css'

export default function Score(props) {

    useEffect(() => {
        const staff = document.getElementById('staff');
        staff.innerHTML = '';
        const VF = Vex.Flow;
        var vf = new VF.Factory({renderer: {elementId: 'staff'}});
        var score = vf.EasyScore();
        var system = vf.System();
        system.addStave({
            voices: [score.voice(score.notes(props.notes.vexStr, {clef: props.notes.clef, key: 'C'}))]
          }).addClef(props.notes.clef)
        vf.draw();
        
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now()

        // this works but not for lowest notes, also plays initially which is not ideal
        props.notes.toneArr.forEach(note => synth.triggerAttackRelease(note, '2n', now));

        
    }, [props.notes])

    return (
        <div>
            <h2>{props.notes.display}</h2>
            <div id="staff">
            </div>
        </div>
        
    )
}