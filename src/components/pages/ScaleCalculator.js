import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@material-ui/core";
import AccidentalSelect from "../forms/AccidentalSelect";
import ClefSelect from "../forms/ClefSelect";
import RootSelect from "../forms/RootSelect";
import Score from "../Score";
import { FormItem } from "../Layout";
import { calculateScale } from "../../utils/musicFunctions";
import * as Tone from "tone";
import ScaleTypeSelect from "../forms/ScaleTypeSelect";
import ModeSelect from "../forms/ModeSelect";
import { StyledButton } from "../forms/StyledButton";

export default function ScaleCalculator() {
  const [notes, setNotes] = useState(null);
  const [formData, setFormData] = useState({
    root: "C",
    clef: "treble",
    accidental: "natural",
    scaleType: "major",
    sound: true,
    mode: 0,
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClick = () => {
    const { root, clef, accidental, scaleType, mode } = formData;
    const scale = calculateScale(root, clef, accidental, scaleType, mode);
    setNotes({ ...scale, numNotes: 8 });
  };

  const playNotes = (notes) => {
    if (!formData.sound) return;
    let timeStart = 0;
    let timeAdd = 0.5;
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    notes.forEach((note) => {
      synth.triggerAttackRelease(note, "4n", now + timeStart);
      timeStart += timeAdd;
    });
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
      <ScaleTypeSelect
        value={formData.scaleType}
        onChange={(e) =>
          setFormData({ ...formData, scaleType: e.target.value })
        }
      />
      <ModeSelect
        value={formData.mode}
        onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
        scaleType={formData.scaleType}
      />
      {!isMobile && (
        <FormItem>
          <FormControl fullWidth>
            <InputLabel id="sound-label">Sound</InputLabel>
            <Select
              id="sound"
              labelId="sound-label"
              value={formData.sound ? "on" : "off"}
              onChange={(e) =>
                setFormData({ ...formData, sound: e.target.value === "on" })
              }
            >
              <MenuItem value="off">off</MenuItem>
              <MenuItem value="on">on</MenuItem>
            </Select>
          </FormControl>
        </FormItem>
      )}
      {!isMobile && (
        <StyledButton
          variant="contained"
          onClick={() => setNotes(null)}
          disabled={!notes}
        >
          Clear
        </StyledButton>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gridColumn: isMobile ? "span 3" : "span 1",
          width: "100%",
        }}
      >
        <StyledButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Calculate
        </StyledButton>
      </div>

      {!isMobile && (
        <StyledButton
          disabled={!notes?.toneArr || !formData.sound}
          variant="contained"
          color="secondary"
          onClick={() => playNotes(notes.toneArr)}
        >
          Play
        </StyledButton>
      )}
      {notes && !isMobile && (
        <Box style={{ gridColumn: "span 3", textAlign: "center" }}>
          <Score notes={notes} />
        </Box>
      )}
      {notes && isMobile && (
        <Dialog open={notes}>
          <Score notes={notes} />
          <Button
            onClick={() => setNotes(null)}
            handleClose={() => setNotes(null)}
          >
            Close
          </Button>
        </Dialog>
      )}
    </>
  );
}
