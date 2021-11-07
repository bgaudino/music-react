import { alphabet } from "../../utils/musicConstants";
import { Button, Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import Score from "../Score";
import ClefSelect from "../forms/ClefSelect";
import TextField from "@material-ui/core/TextField";

const scoreStyles = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
};
export default function NoteID(props) {
  const [numAttempts, setNumAttempts] = useState(0);
  const [octaves, setOctaves] = useState(["4", "5"]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState({
    vexStr: null,
    display: "",
    clef: "treble",
    octave: "4",
  });
  const [numCorrect, setNumCorrect] = useState(0);
  const [currentNote, setCurrentNote] = useState(
    alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
  );
  const [PCT, setPCT] = useState(0);
  const [emoji, setEmoji] = useState(null);

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

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const makeGuess = (e) => {
    let updatedAttempts = numAttempts + 1;
    let pct = null;
    setNumAttempts(updatedAttempts);
    const newGuess = e.target.innerText;
    if (newGuess === currentNote) {
      const newNote =
        alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
      const newOctave = octaves[Math.floor(Math.random() * 2)];
      const updatedCorrect = numCorrect + 1;
      setNumCorrect(updatedCorrect);
      setCurrentNote(newNote);
      setNotes({
        ...notes,
        vexStr: newNote + newOctave + "/w",
        display: "",
        octave: newOctave,
      });
      pct = Math.round((updatedCorrect / updatedAttempts) * 100);
      setPCT(pct);
    } else {
      pct = Math.round((numCorrect / updatedAttempts) * 100);
      setPCT(pct);
    }
    if (pct > 90) setEmoji("😁");
    else if (pct > 80) setEmoji("😀");
    else if (pct > 70) setEmoji("😐");
    else if (pct > 60) setEmoji("😟");
    else setEmoji("😭");
  };

  const submitScore = () => {
    const score = {
      name: name,
      numCorrect: numCorrect,
      numAttempts: numAttempts,
      pct: Math.round((numCorrect / numAttempts) * 100),
      game: "Note ID",
    };

    fetch(
      "https://sheet.best/api/sheets/fa8cefd4-9b56-41da-8404-f1bb6419f02c",
      {
        method: "POST",
        headers: {
          "X-API-KEY":
            "Rj-G_Fdl-q#fRaEaaC299_ThGg-0zS4HcDWQ4ky3w5J1MmeJ6t-U5rY0adfa8qnG",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(score),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        props.setRoute("Leaderboard");
      })
      .catch((error) => console.log(error));

    setName("");
    setNumAttempts(0);
    setNumCorrect(0);
    setEmoji(null);
    setPCT(0);
  };
  useEffect(() => {
    const octave = octaves[Math.floor(Math.random() * 2)];
    setNotes({
      ...notes,
      vexStr: currentNote + octave + "/w",
      display: "",
      octave: octave,
    }); // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <h2>Note Identification</h2>
      </Grid>
      <Grid item xs={12}>
        <h3 style={scoreStyles}>
          <span>Score:</span>
          <span>
            {numCorrect} / {numAttempts}
          </span>
          <span>{PCT}%</span>
          <span>{emoji}</span>
        </h3>
      </Grid>
      <Grid xs={12} item>
        {notes.vexStr !== null ? <Score notes={notes} numNotes={1} /> : null}
      </Grid>
      <Grid item xs={12}>
        <ClefSelect onChange={changeClef} />
      </Grid>
      <Grid item xs={12}>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          {alphabet.map((note) => (
            <Button fullWidth variant="contained" onClick={makeGuess}>
              {note}
            </Button>
          ))}
        </Box>
      </Grid>
      <div>
        <TextField
          value={name}
          onChange={onNameChange}
          id="standard-basic"
          label="Name"
        />

        <Button onClick={submitScore} variant="contained" color="primary">
          Submit Score
        </Button>
      </div>
    </>
  );
}
