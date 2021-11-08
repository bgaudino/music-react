import { useEffect, useState } from "react";
import { Button, Select, Grid, MenuItem } from "@material-ui/core";
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
  const [formData, setFormData] = useState({
    root: "C",
    clef: "treble",
    accidental: "natural",
    genericInterval: 0,
    quality: "perfect",
    sound: "ascending",
  });

  useEffect(() => handleClick(), [formData]);

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
      <Score notes={notes} width={140} />
      <Grid item xs={12}>
        <h2 style={{ textAlign: "center" }}>Interval Calculator</h2>
      </Grid>
      <Grid item xs={6} sm={4}>
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
      <Grid item xs={6} sm={4}>
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
      <Grid item xs={6} sm={4}>
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
      <Grid item xs={6} sm={4}>
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
      <Grid item xs={6} sm={4}>
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
      <Grid item xs={6} sm={4}>
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
      <Grid item xs={0} sm={4} />
      <Grid item xs={12} sm={4}>
        <Button
          fullWidth
          disabled={formData.sound === "off"}
          variant="contained"
          color="primary"
          onClick={() => playNotes(notes.toneArr, formData.sound, "4n")}
        >
          Play
        </Button>
      </Grid>
    </>
  );
}
