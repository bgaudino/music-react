import { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  Grid,
  useMediaQuery,
  Grow,
  Box,
  DialogActions,
} from "@material-ui/core";
import AccidentalSelect from "../forms/AccidentalSelect";
import Buttons from "../forms/Buttons";
import ClefSelect from "../forms/ClefSelect";
import RootSelect from "../forms/RootSelect";
import Score from "../Score";
import { calculateScale } from "../../utils/musicFunctions";
import * as Tone from "tone";
import ScaleTypeSelect from "../forms/ScaleTypeSelect";
import ModeSelect from "../forms/ModeSelect";

export default function ScaleCalculator() {
  const [notes, setNotes] = useState(null);
  const [showStaff, setShowStaff] = useState(false);
  const [formData, setFormData] = useState({
    root: "C",
    clef: "treble",
    accidental: "natural",
    scaleType: "major",
    sound: true,
    mode: 0,
  });

  const isMobile = useMediaQuery("(max-width:599px)");

  const handleClick = () => {
    const { root, clef, accidental, scaleType, mode } = formData;
    const scale = calculateScale(root, clef, accidental, scaleType, mode);
    setNotes({ ...scale, numNotes: 8 });
    setShowStaff(true);
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
      <Grid item xs={12}>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Scale Calculator
        </h2>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ClefSelect
          value={formData.clef}
          onChange={(e) => setFormData({ ...formData, clef: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <RootSelect
          value={formData.root}
          onChange={(e) => setFormData({ ...formData, root: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AccidentalSelect
          value={formData.accidental}
          onChange={(e) =>
            setFormData({ ...formData, accidental: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ScaleTypeSelect
          value={formData.scaleType}
          onChange={(e) =>
            setFormData({ ...formData, scaleType: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ModeSelect
          value={formData.mode}
          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
          scaleType={formData.scaleType}
        />
      </Grid>
      <Buttons
        isMobile={isMobile}
        onPlay={() => playNotes(notes.toneArr)}
        onCalculate={handleClick}
        onClear={() => setShowStaff(false)}
        playDisabled={!showStaff || !notes.toneArr}
        clearDisabled={!showStaff}
      />
      {!isMobile ? (
        <Grid item xs={12}>
          <Grow in={showStaff}>
            <Card>
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Score notes={notes} />
              </Box>
            </Card>
          </Grow>
        </Grid>
      ) : (
        <Dialog open={showStaff}>
          <Score notes={notes} showStaff={true} />
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => playNotes(notes.toneArr)}
            >
              Play
            </Button>
          </DialogActions>
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setShowStaff(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
