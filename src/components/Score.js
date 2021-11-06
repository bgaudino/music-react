import { useMediaQuery } from "@material-ui/core";
import { useEffect, useRef } from "react";
import Vex from "vexflow";

export default function Score(props) {
  const { notes } = props || {};
  const staffRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:599px)");

  useEffect(() => {
    if (!notes) return;
    const staff = staffRef.current;
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
  }, [props, notes]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{notes?.display}</h2>
      <div
        style={{
          marginLeft: isMobile ? "-20%" : 0,
          display: "grid",
          placeItems: "center",
          transform: isMobile ? "scale(0.5)" : "scale(1)",
        }}
        ref={staffRef}
        id="staff"
      />
    </div>
  );
}
