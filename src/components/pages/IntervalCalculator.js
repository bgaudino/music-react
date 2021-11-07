import { useState } from "react";
import {
  Button,
  Box,
  Card,
  Select,
  Grid,
  useMediaQuery,
  Grow,
  Dialog,
  DialogActions,
  MenuItem,
} from "@material-ui/core";
import Buttons from "../forms/Buttons";
import Score from "../Score";
import ClefSelect from "../forms/ClefSelect";
import RootSelect from "../forms/RootSelect";
import AccidentalSelect from "../forms/AccidentalSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { intervals } from "../../utils/musicConstants";
import { calculateInterval } from "../../utils/musicFunctions";
import playNotes from "../../utils/playNotes";

export default function IntervalCalculator() {
  const [notes, setNotes] = useState(null);
  const [showStaff, setShowStaff] = useState(false);
  const [formData, setFormData] = useState({
    root: "C",
    clef: "treble",
    accidental: "natural",
    genericInterval: 0,
    quality: "perfect",
    sound: "ascending",
  });

  const isMobile = useMediaQuery("(max-width:599px)");

  const handleClick = () => {
    const { root, clef, accidental, genericInterval, quality } = formData;
    const interval = calculateInterval(
      root,
      accidental,
      genericInterval,
      quality,
      clef
    );
    setNotes({ ...interval, numNotes: 1 });
    setShowStaff(true);
  };

  const shouldChangeQuality = (value) => {
    const perfects = intervals.perfectIntervals;
    if (
      perfects.includes(value) &&
      !perfects.includes(formData.genericInterval)
    ) {
      return "perfect";
    }
    if (
      !perfects.includes(value) &&
      perfects.includes(formData.genericInterval)
    ) {
      return "major";
    }
    return formData.quality;
  };

  return (
    <>
      <Grid item xs={12}>
        <h2 style={{ textAlign: "center" }}>Interval Calculator</h2>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ClefSelect
          value={formData.clef}
          onChange={(e) =>
            setFormData({
              ...formData,
              clef: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <RootSelect
          value={formData.root}
          onChange={(e) =>
            setFormData({
              ...formData,
              root: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AccidentalSelect
          value={formData.accidental}
          onChange={(e) =>
            setFormData({
              ...formData,
              accidental: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="interval-label">Interval</InputLabel>
          <Select
            id="interval"
            labelId="interval-label"
            value={formData.genericInterval}
            onChange={(e) =>
              setFormData({
                ...formData,
                quality: shouldChangeQuality(e.target.value),
                genericInterval: e.target.value,
              })
            }
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
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="quality-label">Quality</InputLabel>
          <Select
            id="quality"
            labelId="quality-label"
            value={formData.quality}
            onChange={(e) =>
              setFormData({
                ...formData,
                quality: e.target.value,
              })
            }
          >
            {intervals.perfectIntervals.includes(formData.genericInterval)
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
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Sound</InputLabel>
          <Select
            value={formData.sound}
            onChange={(e) =>
              setFormData({
                ...formData,
                sound: e.target.value,
              })
            }
          >
            <MenuItem value="off">off</MenuItem>
            <MenuItem value="simultaneous">simultaneous</MenuItem>
            <MenuItem value="ascending">ascending</MenuItem>
            <MenuItem value="descending">descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {!isMobile ? (
        <Buttons
          onCalculate={handleClick}
          onPlay={() => playNotes(notes.toneArr, formData.sound, "2n")}
          onClear={() => setShowStaff(false)}
          playDisabled={!showStaff}
          clearDisabled={!showStaff}
        />
      ) : (
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          Calculate
        </Button>
      )}
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
              onClick={() => {
                handleClick();
                playNotes(notes.toneArr, formData.sound, "2n");
              }}
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
