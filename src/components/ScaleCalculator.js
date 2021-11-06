import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import AccidentalSelect from "./AccidentalSelect";
import ClefSelect from "./ClefSelect";
import RootSelect from "./RootSelect";
import Score from "./Score";
import { FormItem } from "./Layout";
import { calculateScale } from "../utils/musicFunctions";
import { scaleTypes, modes } from "../utils/musicConstants";
import * as Tone from "tone";

export default function ScaleCalculator() {
  const [notes, setNotes] = useState(null);

  const [formData, setFormData] = useState({
    root: "C",
    clef: "treble",
    accidental: "natural",
    scaleType: "major",
    sound: "off",
    mode: 0,
  });

  const handleClick = () => {
    const { root, clef, accidental, scaleType, mode } = formData;
    const scale = calculateScale(root, clef, accidental, scaleType, mode);
    setNotes(scale);
    if (formData.sound !== "off") {
      let timeStart = 0;
      let timeAdd = 0.5;
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const now = Tone.now();
      scale.toneArr.forEach((note) => {
        synth.triggerAttackRelease(note, "4n", now + timeStart);
        timeStart += timeAdd;
      });
    }
  };

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          gridColumn: "span 3",
        }}
      >
        Scale Calculator
      </h2>
      <ClefSelect
        value={formData.clef}
        onChange={(e) => setFormData({ ...formData, clef: e.target.value })}
      />
      <RootSelect
        value={formData.root}
        onChange={(e) => setFormData({ ...formData, root: e.target.value })}
      />
      <AccidentalSelect
        value={formData.accidental}
        onChange={(e) =>
          setFormData({ ...formData, accidental: e.target.value })
        }
      />
      <FormItem>
        <FormControl fullWidth>
          <InputLabel id="scale-type-label">Scale type</InputLabel>
          <Select
            value={formData.scaleType}
            onChange={(e) =>
              setFormData({ ...formData, scaleType: e.target.value })
            }
          >
            {scaleTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormItem>
      <FormItem>
        <FormControl fullWidth>
          <InputLabel id="mode-label">Mode</InputLabel>
          <Select
            value={formData.mode}
            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
          >
            {formData.scaleType === "major"
              ? modes.major.map((mode) => (
                  <MenuItem key={mode} value={modes.major.indexOf(mode)}>
                    {mode}
                  </MenuItem>
                ))
              : null}
            {formData.scaleType === "harmonic minor"
              ? modes.harmonicMinor.map((mode) => (
                  <MenuItem
                    key={mode}
                    value={modes.harmonicMinor.indexOf(mode)}
                  >
                    {mode}
                  </MenuItem>
                ))
              : null}
            {formData.scaleType === "melodic minor"
              ? modes.melodicMinor.map((mode) => (
                  <MenuItem key={mode} value={modes.melodicMinor.indexOf(mode)}>
                    {mode}
                  </MenuItem>
                ))
              : null}
            {formData.scaleType === "harmonic major"
              ? modes.harmonicMinor.map((mode) => (
                  <MenuItem
                    key={mode}
                    value={modes.harmonicMinor.indexOf(mode)}
                  >
                    {mode}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </FormItem>
      <FormItem>
        <FormControl fullWidth>
          <InputLabel id="sound-label">Sound</InputLabel>
          <Select
            id="sound"
            labelId="sound-label"
            value={formData.sound}
            onChange={(e) =>
              setFormData({ ...formData, sound: e.target.value })
            }
          >
            <MenuItem value="off">off</MenuItem>
            <MenuItem value="on">on</MenuItem>
          </Select>
        </FormControl>
      </FormItem>
      <Box
        style={{
          gridColumn: "span 3",
          display: "grid",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleClick}>
          Calculate
        </Button>
      </Box>
      {notes && (
        <Box style={{ gridColumn: "span 3", textAlign: "center" }}>
          <Score notes={notes} numNotes="8" />
        </Box>
      )}
    </>
  );
}
