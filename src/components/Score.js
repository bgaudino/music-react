import { useMediaQuery } from "@material-ui/core";
import { useEffect, useRef } from "react";
import Vex from "vexflow";

export default function Score(props) {
  const { notes, width, height, responsive } = props || {};
  const staffRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const staff = staffRef.current;
    if (!notes || !staff) return;
    staff.innerHTML = "";
    const vf = new Vex.Flow.Factory({
      renderer: { elementId: "staff", width: width || 480, height: 120 },
    });
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
  }, [props, notes, staffRef, width]);

  return (
    <div
      style={{
        width: "100%",
        height: height || 240,
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center", marginTop: "4rem" }}>
        {notes?.display}
      </h2>
      <div
        style={{
          transform: responsive && isMobile ? "scale(0.7)" : "scale(1)",
        }}
        ref={staffRef}
        id="staff"
      />
    </div>
  );
}
