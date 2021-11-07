import { useState } from "react";
import Score from "../Score";
import RootSelect from "../forms/RootSelect";
import ClefSelect from "../forms/ClefSelect";
import AccidentalSelect from "../forms/AccidentalSelect";
import { chordQualities, sevenths } from "../../utils/musicConstants";
import { calculateChord } from "../../utils/musicFunctions";
import {
  Grid,
  useMediaQuery,
  Grow,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";
import Buttons from "../forms/Buttons";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import playNotes from "../../utils/playNotes";

export default function ChordCalculator() {
  const [notes, setNotes] = useState({
    vexStr: "(C4 E4 G4)/w",
    display: "C E G",
    clef: "treble",
    toneArr: ["C4", "E4", "G4"],
  });
  const [sound, setSound] = useState("chord");
  const [inversion, setInversion] = useState(0);
  const [clef, setClef] = useState("treble");
  const [root, setRoot] = useState("C");
  const [quality, setQuality] = useState("major");
  const [accidental, setAccidental] = useState("natural");
  const [showStaff, setShowStaff] = useState(false);
  const isMobile = useMediaQuery("(max-width:599px)");

  const handleClick = () => {
    const chord = calculateChord(root, accidental, quality, clef, inversion);
    setNotes(chord);
    setShowStaff(true);
  };

  return (
    <>
      <Grid item xs={12}>
        <h2>Chord Calculator</h2>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ClefSelect value={clef} onChange={(e) => setClef(e.target.value)} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <RootSelect value={root} onChange={(e) => setRoot(e.target.value)} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AccidentalSelect
          value={accidental}
          onChange={(e) => setAccidental(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="quality-label">Quality</InputLabel>
          <Select
            id="quality"
            labelId="quality-label"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            {chordQualities.map((quality) => (
              <MenuItem key={quality} value={quality}>
                {quality}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="inverion-label">Inversion</InputLabel>
          <Select
            id="inversion"
            labelId="inversion-label"
            value={inversion}
            onChange={(e) => setInversion(e.target.value)}
          >
            <MenuItem value={0}>root position</MenuItem>
            <MenuItem value={1}>1st inversion</MenuItem>
            <MenuItem value={2}>2nd inversion</MenuItem>
            {sevenths.includes(quality) ? (
              <MenuItem value={3}>3rd inversion</MenuItem>
            ) : null}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="sound-label">Sound</InputLabel>
          <Select
            id="sound"
            labelId="sound-label"
            value={sound}
            onChange={(e) => setSound(e.target.value)}
          >
            <MenuItem value="off">off</MenuItem>
            <MenuItem value="chord">chord</MenuItem>
            <MenuItem value="arpeggio">arpeggio</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Buttons
        onCalculate={handleClick}
        onPlay={() => playNotes(notes.toneArr, sound, "2n")}
        onClear={() => setShowStaff(false)}
        playDisabled={!showStaff || sound === "off"}
        clearDisabled={!showStaff}
        showStaff={showStaff}
        isMobile={isMobile}
      />
      {isMobile ? (
        <Dialog open={showStaff} fullScreen>
          <div
            style={{ height: "100vh", display: "grid", placeItems: "center" }}
          >
            <div style={{ width: "100%" }}>
              <Score notes={notes} width={120} />
              <DialogActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => playNotes(notes.toneArr, sound, "4n")}
                  disabled={sound === "off" || !showStaff}
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
            </div>
          </div>
        </Dialog>
      ) : (
        <Grid item xs={12}>
          <Grow in={showStaff}>
            <Card>
              <Score notes={notes} width={120} />
            </Card>
          </Grow>
        </Grid>
      )}
    </>
  );
}
