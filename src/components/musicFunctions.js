import {stackedThirds, chordSteps, doubleAccidentals} from './musicConstants';

export function calculateChord(root, accidental, quality, clef, inversion) {
    let thirdsFromRoot = [...stackedThirds];
    let stepsFromRoot = [...chordSteps];

    // find appropriate octave for clef
    const octaves = [4, 4, 4, 4, 4, 4, 4];
    let octavesDown = 0;
    if (clef === 'alto') octavesDown = 1;
    if (clef === 'bass') octavesDown = 2;
    if (octavesDown > 0) {
        for (let i = 0; i < octaves.length; i++) {
            octaves[i] -= octavesDown;
        }
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
    console.log(octaves);
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
    
    console.log(chord);
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
  
