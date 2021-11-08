import { alphabet } from "../../utils/musicConstants";
import { Button, Grid, useMediaQuery, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import Score from "../Score";
import ClefSelect from "../forms/ClefSelect";
import { getEmoji } from "../../utils/getEmoji";

export default function NoteID(props) {
  const [numAttempts, setNumAttempts] = useState(
    Number(localStorage.getItem("numAttempts")) || 0
  );
  const [numCorrect, setNumCorrect] = useState(
    Number(localStorage.getItem("numCorrect")) || 0
  );
  const [PCT, setPCT] = useState(
    Math.round(numAttempts / numCorrect) * 100 || 0
  );
  const [octaves, setOctaves] = useState(["4", "5"]);
  const [notes, setNotes] = useState({
    vexStr: null,
    display: "",
    clef: "treble",
    octave: "4",
  });
  const [clef, setClef] = useState("treble");
  const [currentNote, setCurrentNote] = useState(
    alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
  );
  const [emoji, setEmoji] = useState(getEmoji(numAttempts, numCorrect));
  const isMobile = useMediaQuery("(max-width:600px)");
  const [feedback, setFeedback] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const changeClef = (e) => {
    let range = [4, 5];
    if (e.target.value === "alto") {
      range = [3, 4];
    } else if (e.target.value === "bass") {
      range = [2, 3];
    }
    setOctaves(range);
    setNotes({
      vexStr: currentNote + "4/w",
      display: "",
      clef: e.target.value,
      octave: range[Math.floor(Math.random() * 2)],
    });
  };

  const makeGuess = (e) => {
    let updatedAttempts = numAttempts + 1;
    let pct = null;
    setNumAttempts(updatedAttempts);
    localStorage.setItem("numAttempts", updatedAttempts);
    const newGuess = e.target.innerText;
    if (newGuess === currentNote) {
      setFeedback("Correct!");
      const newNote =
        alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
      const updatedCorrect = numCorrect + 1;
      setNumCorrect(updatedCorrect);
      localStorage.setItem("numCorrect", updatedCorrect);
      setCurrentNote(newNote);
      pct = Math.round((updatedCorrect / updatedAttempts) * 100);
      setPCT(pct);
    } else {
      setFeedback("Incorrect!");
      pct = Math.round((numCorrect / updatedAttempts) * 100);
      setPCT(pct);
    }
    setFeedbackOpen(true);
    setEmoji(getEmoji(updatedAttempts, updatedAttempts));
  };

  useEffect(() => {
    const octave = octaves[Math.floor(Math.random() * 2)];
    setNotes(() => ({
      clef: clef,
      vexStr: currentNote + octave + "/w",
      display: "",
      octave: octave,
      numNotes: 1,
    }));
  }, [currentNote, octaves, clef]);

  return (
    <>
      <Grid item xs={12}>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Note Identification
        </h2>
        <h3
          style={{
            textAlign: "center",
            marginBottom: -100,
          }}
        >
          Score: {numCorrect}/{numAttempts} {PCT}% {emoji}
        </h3>
      </Grid>
      <Snackbar
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        autoHideDuration={1000}
      >
        <MuiAlert severity={feedback === "Correct!" ? "success" : "error"}>
          {feedback}
        </MuiAlert>
      </Snackbar>
      {notes.vexStr !== null ? <Score notes={notes} width={140} /> : null}
      <Grid item xs={0} sm={4} />
      <Grid item sm={4} xs={12}>
        <ClefSelect
          value={clef}
          onChange={(e) => {
            setClef(e.target.value);
            changeClef(e);
          }}
        />
      </Grid>
      {!isMobile && <Grid item xs={0} sm={4} />}
      {["A", "B", "C", "D", "E", "F", "G"].map((note) => (
        <Grid item xs={3} key={note}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={makeGuess}
          >
            {note}
          </Button>
        </Grid>
      ))}
      <Grid item xs={0} sm={4} />
      <Grid item xs={12} sm={4}>
        <Button
          onClick={() => {
            setNumAttempts(0);
            setNumCorrect(0);
            setPCT(0);
            setEmoji(null);
            localStorage.setItem("numAttempts", 0);
            localStorage.setItem("numCorrect", 0);
          }}
          fullWidth
          variant="contained"
        >
          Reset Score
        </Button>
      </Grid>
    </>
  );
}
