import { Box } from "@material-ui/core";
import { useEffect, useRef } from "react";
import Vex from "vexflow";

export default function Score(props) {
  const { notes, width, shrink } = props || {};
  const staffRef = useRef(null);

  useEffect(() => {
    const staff = staffRef.current;

    if (!notes || !staff) return;
    staff.innerHTML = "";
    const vf = new Vex.Flow.Factory({
      renderer: { elementId: "staff", width: width || 500, height: 200 },
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
  }, [props, notes, staffRef]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>{notes?.display}</h2>
      <div>
        
      </div>
      <div
        style={{
          overflow: "scroll",
        }}
        ref={staffRef}
        id="staff"
      />
    </>
  );
}
