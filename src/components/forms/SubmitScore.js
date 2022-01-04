import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";

export default function SubmitScore({
  numCorrect,
  numAttempts,
  PCT,
  emoji,
  gameType,
  clearScore,
  isOpen,
  setIsOpen,
}) {
  const [name, setName] = useState("");
  const [scoreId, setScoreId] = useState(null);
  const [redirect, setRedirect] = useState(false);

  function handleSubmit() {
    const body = {
      name,
      game_type: gameType,
      num_correct: numCorrect,
      num_attempted: numAttempts,
    };
    fetch(process.env.REACT_APP_LEADERBOARD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setScoreId(data.id);
        clearScore();
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  }

  function getRedirectUrl() {
    let url = `/leaderboard/${gameType}`;
    if (scoreId) {
      url += `?score_id=${scoreId}`;
    }
    return url;
  }
  if (redirect) return <Redirect to={getRedirectUrl()} />;

  return (
    <>
      <Dialog fullWidth open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Submit Score</DialogTitle>
        <DialogContent>
          <Typography variant="h2">
            {numCorrect} / {numAttempts}
          </Typography>
          <Typography variant="h4">
            {PCT}% {emoji}
          </Typography>
          <br />
          <Typography variant="body2">
            Enter your name and submit your score!
          </Typography>
          <br />
          <TextField
            autoFocus
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ background: "#fff" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!name}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
