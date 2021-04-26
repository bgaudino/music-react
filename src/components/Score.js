import {useEffect} from 'react';
import Vex from 'vexflow';

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
            voices: [score.voice(score.notes(props.notes.vexStr, {clef: props.clef}))]
          }).addClef(props.clef)
        vf.draw();
    }, [props.notes, props.clef])

    return (
        <div>
            <h2>{props.notes.display}</h2>
            <div id="staff">
            </div>
        </div>
        
    )
}