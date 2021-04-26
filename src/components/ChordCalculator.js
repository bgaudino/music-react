import {useState} from 'react';
import Score from './Score';
import {stackedThirds, alphabet, triadQualities, chordSteps} from './musicConstants'



export default function ChordCalculator() {
  const [notes, setNotes] = useState('(C4 E4 G4)/w');
  const [root, setRoot] = useState('C');
  const [selectedTriadSteps, setSteps] = useState([4, 3]);
  const [spelling, setSpelling] = useState('C E G');
  const [accidental, setAccidental] = useState('natural');

  function handleQualityChange (e) {
    switch(e.target.value) {
      case 'major':
        setSteps([4, 3]);
        break;
      case 'minor':
        setSteps([3, 4]);
        break;
      case 'augmented':
        setSteps([4, 4]);
        break;
      case 'diminished':
        setSteps([3, 3]);
        break;
      default:
        break;
    }
  }

  function handleAccidentalChange(e) {
    setAccidental(e.target.value);
  }

  function handleRootChange(e) {
    setRoot(e.target.value);
  }

  function handleClick() {
    let thirdsFromRoot = [...stackedThirds];
    let stepsFromRoot = [...chordSteps];

    // find root
    while (thirdsFromRoot[0] !== root.toUpperCase()) {
      let addNoteToEnd = thirdsFromRoot.shift();
      thirdsFromRoot.push(addNoteToEnd);
      let addStepsToEnd = stepsFromRoot.shift();
      stepsFromRoot.push(addStepsToEnd);
    } 

    // add accidentals
    if (accidental === 'sharp') {
      thirdsFromRoot[0] += '#';
      stepsFromRoot[0]--;
    } else if (accidental === 'flat') {
      thirdsFromRoot[0] += 'b';
      stepsFromRoot[0]++;
    }
    for (let i = 0; i < selectedTriadSteps.length + 1; i ++) {
      if (selectedTriadSteps[i] === stepsFromRoot[i] + 2) {
        thirdsFromRoot[i + 1] += '##';
        stepsFromRoot[i + 1] -= 2;
      } else if (selectedTriadSteps[i] === stepsFromRoot[i] + 1) {
        thirdsFromRoot[i + 1] += '#';
        stepsFromRoot[i + 1]--;
      } else if (selectedTriadSteps[i] === stepsFromRoot[i] - 2) {
        thirdsFromRoot[i + 1] += 'bb';
        stepsFromRoot[i + 1] += 2;
      } else if (selectedTriadSteps[i] < stepsFromRoot[i]) {
        thirdsFromRoot[i + 1] += 'b';
        stepsFromRoot[i + 1]++;
      }
    }

    // create chord spelling and string for vexflow
    let chord = '(';
    let chordSpelling = ''
    for (let i = 0; i < 3; i++) {
      chordSpelling += thirdsFromRoot[i] + ' ';
      chord += thirdsFromRoot[i] + '4 ';
    } chord = chord.trim().concat(')/w');
    chordSpelling = chordSpelling.trim()
      .replaceAll('##', '𝄪')
      .replaceAll('#', '♯')
      .replaceAll('bb', '𝄫')
      .replaceAll('b', '♭');
    setSpelling(chordSpelling);
    setNotes(chord);
  }

    return (
        <div>
            <h2>Triad Calculator</h2>
            <div id="triadForm" className="input-group">
                <span class="input-group-text">Root:</span>
                <select className="form-select" onChange={handleRootChange}>
                {alphabet.map(note => <option value={note}>{note}</option>)}
                </select>
                <span class="input-group-text">Accidental:</span>
                <select className="form-select" onChange={handleAccidentalChange}>
                <option value="natural">♮</option>
                <option value="sharp">♯</option>
                <option value="flat">♭</option>
                </select>
                <span class="input-group-text">Quality:</span>
                <select className="form-select" onChange={handleQualityChange}>
                {triadQualities.map(quality => <option value={quality}>{quality}</option>)}
                </select>
                <button className="btn btn-primary" onClick={handleClick}>Submit</button>
            </div>
            <Score notes={notes} spelling={spelling}/>
        </div>
    );
  }
