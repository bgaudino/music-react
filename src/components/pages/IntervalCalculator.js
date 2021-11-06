import { useState } from "react";
import Score from "../Score";
import ClefSelect from "../forms/ClefSelect";
import RootSelect from "../forms/RootSelect";
import AccidentalSelect from "../forms/AccidentalSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import { intervals } from "../../utils/musicConstants";
import { calculateInterval } from "../../utils/musicFunctions";
import { FormItem } from "../Layout";
import * as Tone from "tone";

const styles = { width: "33%" };

export default function IntervalCalculator() {
  const [notes, setNotes] = useState({
    clef: "treble",
    vexStr: "(C4 C4)/w",
    display: "C C",
  });
  const [clef, setClef] = useState("treble");
  const [root, setRoot] = useState("C");
  const [accidental, setAccidental] = useState("natural");
  const [genericInterval, setGenericInterval] = useState(0);
  const [quality, setQuality] = useState("perfect");
  const [sound, setSound] = useState("off");

  const handleRootChange = (e) => setRoot(e.target.value);
  const handleClefChange = (e) => setClef(e.target.value);
  const handleAccidentalChange = (e) => setAccidental(e.target.value);
  const handleIntervalChange = (e) => {
    setGenericInterval(e.target.value);
    intervals.perfectIntervals.includes(e.target.value)
      ? setQuality("perfect")
      : setQuality("major");
  };
  const handleQualityChange = (e) => setQuality(e.target.value);
  const handleSoundChange = (e) => setSound(e.target.value);

  const handleClick = () => {
    const interval = calculateInterval(
      root,
      accidental,
      genericInterval,
      quality,
      clef
    );
    setNotes(interval);
    if (sound !== "off") {
      let timeStart = 0;
      let timeAdd = null;
      sound === "simultaneous" ? (timeAdd = 0) : (timeAdd = 0.5);
      if (sound === "descending")
        interval.toneArr.push(interval.toneArr.shift());
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const now = Tone.now();
      interval.toneArr.forEach((note) => {
        synth.triggerAttackRelease(note, "2n", now + timeStart);
        timeStart += timeAdd;
      });
    }
  };

  return (
    <>
      <h2 style={{ gridColumn: "span 3", textAlign: "center" }}>Interval Calculator</h2>
      <ClefSelect value={clef} onChange={handleClefChange} />
      <RootSelect value={root} onChange={handleRootChange} />
      <AccidentalSelect value={accidental} onChange={handleAccidentalChange} />
      <FormItem>
        <FormControl style={styles}>
          <InputLabel id="interval-label">Interval</InputLabel>
          <Select
            id="interval"
            labelId="interval-label"
            value={genericInterval}
            onChange={handleIntervalChange}
          >
            {intervals.genericIntervals.map((interval) => (
              <MenuItem
                key={interval}
                value={intervals.genericIntervals.indexOf(interval)}
              >
                {interval}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormItem>
      <FormControl style={styles}>
        <InputLabel id="quality-label">Quality</InputLabel>
        <Select
          id="quality"
          labelId="quality-label"
          value={quality}
          onChange={handleQualityChange}
        >
          {intervals.perfectIntervals.includes(genericInterval)
            ? intervals.perfectQualities.map((quality) => (
                <MenuItem key={quality} value={quality}>
                  {quality}
                </MenuItem>
              ))
            : intervals.imperfectQualities.map((quality) => (
                <MenuItem key={quality} value={quality}>
                  {quality}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl style={styles}>
        <InputLabel>Sound</InputLabel>
        <Select value={sound} onChange={handleSoundChange}>
          <MenuItem value="off">off</MenuItem>
          <MenuItem value="simultaneous">simultaneous</MenuItem>
          <MenuItem value="ascending">ascending</MenuItem>
          <MenuItem value="descending">descending</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Calculate
      </Button>
      <Score notes={notes} numNotes="1" />
    </>
  );
}
