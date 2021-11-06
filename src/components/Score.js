import { useEffect, useRef } from "react";
import Vex from "vexflow";
import { Card } from "@material-ui/core";

export default function Score(props) {
  const { numNotes, clef, vexStr, display } = props.notes;
  const staffRef = useRef(null);

  useEffect(() => {
    if (!props) return;
    console.log(staffRef.current);
    const staff = staffRef.current;
    staff.innerHTML = "";
    const vf = new Vex.Flow.Factory({ renderer: { elementId: "staff" } });
    const score = vf.EasyScore();
    const system = vf.System();
    score.set({ time: `${numNotes}/1` });
    system
      .addStave({
        voices: [
          score.voice(
            score.notes(vexStr, {
              clef: clef,
              key: "C",
            })
          ),
        ],
      })
      .addClef(clef);
    vf.draw();
  }, [props, numNotes, clef, vexStr]);

  return (
    <Card>
      <h2>{display}</h2>
      <div ref={staffRef} id="staff"></div>
    </Card>
  );
}
