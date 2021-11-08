import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AccidentalSelect from "../forms/AccidentalSelect";
import ClefSelect from "../forms/ClefSelect";
import RootSelect from "../forms/RootSelect";
import Score from "../Score";
import { calculateScale } from "../../utils/musicFunctions";
import playNotes from "../../utils/playNotes";
import ScaleTypeSelect from "../forms/ScaleTypeSelect";
import ModeSelect from "../forms/ModeSelect";

export default function ScaleCalculator() {
  const [notes, setNotes] = useState(null);
  const [formData, setFormData] = useState({
    root: "C",
    clef: "treble",
    accidental: "natural",
    scaleType: "major",
    sound: "ascending",
    mode: 0,
  });

  useEffect(() => {
    const { root, clef, accidental, scaleType, mode } = formData;
    const scale = calculateScale(root, clef, accidental, scaleType, mode);
    setNotes({ ...scale, numNotes: 8 });
  }, [formData]);

  return (
    <>
      <Score notes={notes} responsive={true} />
      <Grid item xs={12}>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Scale Calculator
        </h2>
      </Grid>
      <Grid item xs={6} sm={4}>
        <ClefSelect
          value={formData.clef}
          onChange={(e) => setFormData({ ...formData, clef: e.target.value })}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <RootSelect
          value={formData.root}
          onChange={(e) => setFormData({ ...formData, root: e.target.value })}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <AccidentalSelect
          value={formData.accidental}
          onChange={(e) =>
            setFormData({ ...formData, accidental: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <ScaleTypeSelect
          value={formData.scaleType}
          onChange={(e) =>
            setFormData({ ...formData, scaleType: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <ModeSelect
          value={formData.mode}
          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
          scaleType={formData.scaleType}
        />
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
          onClick={() => playNotes(notes.toneArr, formData.sound, "4n")}
          color="primary"
        >
          Play
        </Button>
      </Grid>
    </>
  );
}
