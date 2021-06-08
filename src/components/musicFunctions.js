import {alphabet, stackedThirds, chordSteps, doubleAccidentals, majorScaleSteps} from './musicConstants';

export function calculateScale(root, clef, accidental, scaleType, mode) {

    let scale = {
        notes: [...alphabet],
        steps: [...majorScaleSteps],
        octaves: [4, 4, 4, 4, 4, 4, 4],
        vexStr: '',
        display: '',
        toneArr: [],
        clef: clef, 
    };

    // find appropriate octave for clef
    let octavesDown = 0;
    if (clef === 'alto') octavesDown = 1;
    if (clef === 'bass') octavesDown = 2;
    if (octavesDown > 0) {
        scale.octaves = scale.octaves.map(octave => octave - octavesDown);
    }

    // reorder notes to start on tonic
    while (root !== scale.notes[0]) {
        scale.notes.push(scale.notes.shift());
        scale.steps.push(scale.steps.shift());
        scale.octaves.push(scale.octaves.shift() + 1);
    }

    // find steps by scale type
    let newSteps = []
    switch (scaleType) {
        case "major":
          newSteps = [2, 2, 1, 2, 2, 2, 1];
          break;
        case "harmonic minor":
          newSteps = [2, 1, 2, 2, 1, 3, 1];
          break;
        case "melodic minor":
          newSteps = [2, 1, 2, 2, 2, 2, 1];
          break;
        case "harmonic major":
          newSteps = [2, 2, 1, 2, 1, 3, 1];
          break;
        default:
            break;
    }

    // adjust for mode
    for (let i = 0; i < mode; i++) {
        newSteps.push(newSteps.shift())
    }

    // add octave tonic
    scale.notes.push(scale.notes[0]);

    // add accidentals 
    scale = addAccidentals(scale, accidental, newSteps);

    


    // format notes for vexflow
    scale.octaves.push(scale.octaves[0] + 1);
    for (let i = 0; i < scale.notes.length; i++) {
        scale.vexStr += scale.notes[i] + scale.octaves[i];
        scale.toneArr.push(scale.notes[i] + scale.octaves[i]);
        if (i === 0) scale.vexStr += '/w';
        scale.display += scale.notes[i];
        if (i !== scale.notes.length - 1) {
            scale.display += ' ';
            scale.vexStr += ', '
        }
    }

    return scale;

}

export function calculateInterval(root, accidental, genericInterval, quality, clef) {
    let scale = {
        notes: [...alphabet],
        steps: [...majorScaleSteps],
        octaves: [4, 4, 4, 4, 4, 4, 4],
    }
    
    // find appropriate octave for clef
    let octavesDown = 0;
    if (clef === 'alto') octavesDown = 1;
    if (clef === 'bass') octavesDown = 2;
    if (octavesDown > 0) {
        scale.octaves = scale.octaves.map(octave => octave - octavesDown);
    }

    while (root !== scale.notes[0]) {
        scale.notes.push(scale.notes.shift());
        scale.steps.push(scale.steps.shift());
        scale.octaves.push(scale.octaves.shift() + 1);
    }
    let interval = {
        notes: [scale.notes[0]],
        octaves: [scale.octaves[0]],
        clef: clef,
        vexStr: '(',
        steps: 0,
        adjustedSteps: 0,
        display: '',
        toneArr: [],
    }
    if (genericInterval === 7) {
        interval.notes.push(interval.notes[0]);
        interval.octaves.push(interval.octaves[0] + 1);
    } else {
        interval.notes.push(scale.notes[genericInterval]);
        interval.octaves.push(scale.octaves[genericInterval]);
        for (let i = 0; i < genericInterval; i++) {
            interval.steps += scale.steps[i];
            interval.adjustedSteps += majorScaleSteps[i];
        }
    }
    switch(quality) {
        case 'minor':
            interval.adjustedSteps--;
            break;
        case 'augmented':
            interval.adjustedSteps++;
            break;
        case 'diminished':
            interval.adjustedSteps--;
            break;
        default:
            break;
    }

    // add accidental to root
    if (accidental === 'sharp') {
        interval.notes[0] += '#';
        interval.steps--;
    } else if (accidental === 'flat') {
        interval.notes[0] += 'b';
        interval.steps++;
    }
    interval.display = interval.notes[0];

    if (interval.steps === interval.adjustedSteps - 2) {
        interval.notes[1] += '##';
    } else if (interval.steps === interval.adjustedSteps - 1) {
        interval.notes[1] += '#';
    } else if (interval.steps === interval.adjustedSteps + 2) {
        interval.notes[1] += 'bb';
    } else if (interval.steps === interval.adjustedSteps + 1) {
        interval.notes[1] += 'b'
    }
    
    for (let i = 0; i < interval.notes.length; i++) {
        interval.vexStr += interval.notes[i] + interval.octaves[i];
        interval.toneArr.push(interval.notes[i] + interval.octaves[i]);
    } interval.vexStr += ')/w';
    interval.display += ' ' + interval.notes[1]
    interval.display = interval.display
        .replaceAll('##', '𝄪')
        .replaceAll('#', '♯')
        .replaceAll('bb', '𝄫')
        .replaceAll('b', '♭');

    return interval;
}

export function calculateChord(root, accidental, quality, clef, inversion) {
    let thirdsFromRoot = [...stackedThirds];
    let stepsFromRoot = [...chordSteps];

    // find appropriate octave for clef
    let octaves = [4, 4, 4, 4, 4, 4, 4];
    let octavesDown = 0;
    if (clef === 'alto') octavesDown = 1;
    if (clef === 'bass') octavesDown = 2;
    if (octavesDown > 0) {
        octaves = octaves.map(octave => octave -= octavesDown);
    }

    // reorder notes to start on root
    while (thirdsFromRoot[0] !== root.toUpperCase()) {
        let addNoteToEnd = thirdsFromRoot.shift();
        let addStepsToEnd = stepsFromRoot.shift();
        let octaveUp = octaves.shift() + 1;
        thirdsFromRoot.push(addNoteToEnd);
        stepsFromRoot.push(addStepsToEnd);
        octaves.push(octaveUp);
    }

    // fix octaves, in a hackish way =(
    switch(root) {
        case 'E':
            octaves[3]++;
            break;
        case 'G':
            octaves[3]++;
            octaves[2]++;
            break;
        case 'B':
            octaves[3]++;
            octaves[2]++;
            octaves[1]++;
            break;
        default:
            break;
    }


    // add accidental to root
    if (accidental === 'sharp') {
        thirdsFromRoot[0] += '#';
        stepsFromRoot[0]--;
    } else if (accidental === 'flat') {
        thirdsFromRoot[0] += 'b';
        stepsFromRoot[0]++;
    }

    // add accidental to remaining notes
    const steps = findChordStepsByQuality(quality);
    for (let i = 0; i < steps.length + 1; i++) {
        if (steps[i] === stepsFromRoot[i] + 2) {
            thirdsFromRoot[i + 1] += '##';
            stepsFromRoot[i + 1] -= 2;
        } else if (steps[i] === stepsFromRoot[i] + 1) {
            thirdsFromRoot[i + 1] += '#';
            stepsFromRoot[i + 1]--;
        } else if (steps[i] === stepsFromRoot[i] - 2) {
            thirdsFromRoot[i + 1] += 'bb';
            stepsFromRoot[i + 1] += 2;
        } else if (steps[i] === stepsFromRoot[i] - 1) {
            thirdsFromRoot[i + 1] += 'b';
            stepsFromRoot[i + 1]++;
        }
    }

    let chord = { 
        vexStr: '(',
        toneArr: [],
        display: '',
        clef: clef,
    }

    // remove unneeded extensions
    thirdsFromRoot.splice(steps.length + 1, thirdsFromRoot.length - steps.length);
    octaves.splice(steps.length + 1, octaves.length - steps.length);

    for (let i = 0; i < Number(inversion); i++) {
        thirdsFromRoot.push(thirdsFromRoot.shift());
        octaves.push(octaves.shift() + 1);
    }

    for (let i = 0; i < steps.length + 1; i++) {
        if (doubleAccidentals.includes(thirdsFromRoot[i])) {
            const respelling = enharmonicRespell(thirdsFromRoot[i]);
            chord.toneArr.push(respelling + octaves[i]);
        } else {
            chord.toneArr.push(thirdsFromRoot[i] + octaves[i]);
        }
        chord.vexStr += thirdsFromRoot[i] + octaves[i];
        chord.display += thirdsFromRoot[i] + ' ';
    }

    chord.vexStr += ')/w';
    chord.display = chord.display.trim()
        .replaceAll('##', '𝄪')
        .replaceAll('#', '♯')
        .replaceAll('bb', '𝄫')
        .replaceAll('b', '♭');
    
    return chord;
}

function findChordStepsByQuality(quality) {
    let steps = []
    // determine steps based on quality 
    switch(quality) {
        case 'major':
            steps = [4, 3];
            break;
        case 'minor':
            steps = [3, 4];
            break;
        case 'augmented':
            steps = [4, 4];
            break;
        case 'diminished':
            steps = [3, 3];
            break;
        case 'major 7':
            steps = [4, 3, 4]
            break;
        case 'dominant 7':
            steps = [4, 3, 3];
            break;
        case 'minor 7':
            steps = [3, 4, 3];
            break; 
        case 'half-diminished 7':
            steps = [3, 3, 4];
            break;
        case 'diminished 7':
            steps = [3, 3, 3];
            break;
        case 'minor-major 7':
            steps = [3, 4, 4];
            break;
        default:
            break;
    }
    return steps;
}

function enharmonicRespell(note) {
    switch (note) {
        case 'A##':
            return 'B'
        case 'B##':
            return 'C#';
        case 'C##':
            return 'D';
        case 'D##':
            return 'E';
        case 'E##':
            return 'F#';
        case 'F##':
            return 'G';
        case 'G##':
            return 'A';
        case 'Abb':
            return 'G'
        case 'Bbb':
            return 'A';
        case 'Cbb':
            return 'Bb';
        case 'Dbb':
            return 'C';
        case 'Ebb':
            return 'D';
        case 'Fbb':
            return 'Eb';
        case 'Gbb':
            return 'F';
        default:
            break;
    }
}
  
function addAccidentals(scale, accidental, newSteps) {
    if (accidental === "sharp") {
    scale.steps[0]--;
    scale.notes[0] += "#";
    if (scale.notes.length > 6) {
      scale.steps[6]++;
      scale.notes[7] += "#"
    }

  } else if (accidental === "flat") {
    scale.steps[0]++;
    scale.notes[0] += "b";
    if (scale.notes.length > 6) {
      scale.steps[6]--;
      scale.notes[7] += 'b';
    }
  }

    for (let i = 0; i < scale.steps.length; i++) {
    if (scale.steps[i] === newSteps[i] - 1) {
      scale.notes[(i + 1) % scale.notes.length] += "#";
      scale.steps[(i + 1) % scale.steps.length]--;
    } else if (scale.steps[i] === newSteps[i] - 2) {
      scale.notes[(i + 1) % scale.notes.length] += "##";
      scale.steps[(i + 1) % scale.steps.length] -= 2;
    } else if (scale.steps[i] === newSteps[i] + 1) {
      scale.notes[(i + 1) % scale.notes.length] += "b";
      scale.steps[(i + 1) % scale.steps.length]++;
    } else if (scale.steps[i] === newSteps[i] + 2) {
      scale.notes[(i + 1) % scale.notes.length] += "bb";
      scale.steps[(i + 1) % scale.steps.length] += 2;
    }
  } return scale;
}

export function randomInterval() {

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let range = [];
    for (let i = 3; i < 6; i++) {
        notes.forEach(note => range.push(note + String(i)));
    }
    const lowIndex = Math.floor(Math.random() * (range.length - 13));
    const interval = Math.floor(Math.random() * 13);
    const highIndex = lowIndex + interval;
    let intervalNotes = [range[lowIndex], range[highIndex]]
    return {
        notes: intervalNotes,
        interval: interval
    }

}

randomInterval();
