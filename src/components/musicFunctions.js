import {stackedThirds, chordSteps} from './musicConstants';

export function calculateChord(root, accidental, quality) {
    let thirdsFromRoot = [...stackedThirds];
    let stepsFromRoot = [...chordSteps];

    // reorder notes to start on root
    while (thirdsFromRoot[0] !== root.toUpperCase()) {
        let addNoteToEnd = thirdsFromRoot.shift();
        let addStepsToEnd = stepsFromRoot.shift();
        thirdsFromRoot.push(addNoteToEnd);
        stepsFromRoot.push(addStepsToEnd);
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
        display: '',
    }
    for (let i = 0; i < steps.length + 1; i++) {
        chord.vexStr += thirdsFromRoot[i] + '4 ';
        chord.display += thirdsFromRoot[i] + ' ';
    }
    chord.vexStr = chord.vexStr.trim().concat(')/w');
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