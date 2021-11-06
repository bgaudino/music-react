import { useEffect, useState } from "react";
import Vex from "vexflow";
import { Card } from "@material-ui/core";
import { Slide } from "@material-ui/core";

export default function Score(props) {
  useEffect(() => {
    if (!props) return;
    const staff = document.getElementById("staff");
    staff.innerHTML = "";
    const VF = Vex.Flow;
    var vf = new VF.Factory({ renderer: { elementId: "staff" } });
    var score = vf.EasyScore();
    var system = vf.System();
    score.set({ time: props.numNotes + "/1" });
    system
      .addStave({
        voices: [
          score.voice(
            score.notes(props.notes.vexStr, {
              clef: props.notes.clef,
              key: "C",
            })
          ),
        ],
      })
      .addClef(props.notes.clef);
    vf.draw();
  }, [props]);

  if (!props) return null;

  return (
    <Slide in={true} direction="up" timeout={500}>
      <Card>
        {props.notes.display !== "" ? <h2>{props.notes.display}</h2> : null}
        <div id="staff"></div>
      </Card>
    </Slide>
  );
}
