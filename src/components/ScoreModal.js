import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import { useEffect, useRef } from "react";
import Vex from "vexflow";
import playNotes from "../utils/playNotes";

export default function ScoreModal(props) {
  const { notes, showStaff, setShowStaff, sound, isMobile } = props || {};
  const modalRef = useRef(null);

  useEffect(() => {
    const staff = modalRef.current;

    if (!notes || !staff) return;
    staff.innerHTML = "";
    const vf = new Vex.Flow.Factory({ renderer: { elementId: "staff" } });
    const score = vf.EasyScore();
    const system = vf.System();
    score.set({ time: `${notes.numNotes}/1` });
    system
      .addStave({
        voices: [
          score.voice(
            score.notes(notes.vexStr, {
              clef: notes.clef,
              key: "C",
            })
          ),
        ],
      })
      .addClef(notes.clef);
    vf.draw();
  }, [props, notes, showStaff, isMobile]);

  return (
    <Dialog open={showStaff && notes}>
      <DialogContent>
      <h2 style={{ textAlign: "center" }}>{notes?.display}</h2>
      <div
        style={{
          // marginLeft: isMobile ? "-20%" : 0,
          display: "grid",
          placeItems: "center",
          // transform: isMobile ? "scale(0.5)" : "scale(1)",
        }}
        ref={modalRef}
        id="staff"
      />
      </DialogContent>
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
    </Dialog>
  );
}
