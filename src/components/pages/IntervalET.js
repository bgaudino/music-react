import { useEffect, useState } from "react";
import { intervals } from "../../utils/musicConstants";
import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { randomInterval } from "../../utils/musicFunctions";
import * as Tone from "tone";
import {
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { getEmoji } from "../../utils/getEmoji";

const btnStyle = {
  textTransform: "none",
};

const IntervalButtons = (props) => {
  return (
    <>
      {props.intervals.map((interval) => {
        return (
          <Grid item xs={3} key={interval}>
            <Button
              variant="contained"
              color="primary"
              style={btnStyle}
              onClick={() => props.onClick(interval, props.intervals)}
            >
              {interval}
            </Button>
          </Grid>
        );
      })}
    </>
  );
};

export default function IntervalET(props) {
  const [interval, setInterval] = useState(null);
  const [score, setScore] = useState({
    numCorrect: Number(localStorage.getItem("ETnumCorrect")) || 0,
    numAttempts: Number(localStorage.getItem("ETnumAttempts")) || 0,
    pct:
      Math.round(
        (localStorage.getItem("ETnumCorrect") /
          localStorage.getItem("ETnumAttempts")) *
          100
      ) || 0,
  });
  const [notes, setNotes] = useState([]);
  const [emoji, setEmoji] = useState(
    getEmoji(score.numAttempts, score.numCorrect)
  );
  const [playMode, setPlayMode] = useState("ascending");
  const [feedback, setFeedback] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    const result = randomInterval();
    setInterval(result.interval);
    setNotes(result.notes);
  }, []);

  const onPlayModeChange = (e) => setPlayMode(e.target.value);

  const play = (notes) => {
    if (playMode === "descending") notes = notes.reverse();
    let timeStart = 0;
    let timeAdd = 0.5;
    if (playMode === "simultaneous") timeAdd = 0;
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    notes.forEach((note) => {
      synth.triggerAttackRelease(note, "4n", now + timeStart);
      timeStart += timeAdd;
    });
  };

  const onClick = (item, list) => {
    const updatedAttempts = score.numAttempts + 1;
    const guess = list.indexOf(item);

    let pct = null;
    if (guess === interval) {
      setFeedback("Correct!");
      const updatedCorrect = score.numCorrect + 1;
      pct = Math.round((updatedCorrect / updatedAttempts) * 100);
      setScore({
        numCorrect: updatedCorrect,
        numAttempts: updatedAttempts,
        pct: pct,
      });
      localStorage.setItem("ETnumCorrect", updatedCorrect);
      localStorage.setItem("ETnumAttempts", updatedAttempts);
      const result = randomInterval();
      setInterval(result.interval);
      play(result.notes);
      setNotes(result.notes);
    } else {
      setFeedback("Incorrect!");
      pct = Math.round((score.numCorrect / updatedAttempts) * 100);
      setScore({
        numCorrect: score.numCorrect,
        numAttempts: updatedAttempts,
        pct: Math.round((score.numCorrect / updatedAttempts) * 100),
      });
    }
    setFeedbackOpen(true);
    setEmoji(getEmoji(updatedAttempts, score.numCorrect));
  };

  return (
    <>
      <Grid item xs={12}>
        <h2>Interval Ear Training</h2>
        <h3>
          Score: {score.numCorrect} / {score.numAttempts} {score.pct}% {emoji}
        </h3>
        <Snackbar
          open={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          autoHideDuration={3000}
          elevation={1000}
        >
          <MuiAlert severity={feedback === "Correct!" ? "success" : "error"}>
            {feedback}
          </MuiAlert>
        </Snackbar>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel id="play-mode-label">Play Mode</InputLabel>
          <Select
            value={playMode}
            labelId="play-mode-label"
            id="play-mode"
            onChange={onPlayModeChange}
          >
            <MenuItem value="ascending">ascending</MenuItem>
            <MenuItem value="descending">descending</MenuItem>
            <MenuItem value="simultaneous">simultaneous</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <IntervalButtons intervals={intervals.abbreviations} onClick={onClick} />
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => play(notes)}
        >
          Play again
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            setScore({
              numCorrect: 0,
              numAttempts: 0,
              pct: 0,
            });
            setEmoji(null);
            localStorage.setItem("ETnumAttempts", 0);
            localStorage.setItem("ETnumCorrect", 0);
          }}
          variant="contained"
        >
          Reset Score
        </Button>
      </Grid>
    </>
  );
}
