import * as Tone from "tone";

export default function playNotes(notes, sound, duration) {
  if (sound === "off") return;
  let timeStart = 0;
  const timeAdd = sound === "simultaneous" || sound === "chord" ? 0 : 0.5;
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  const notesToPlay = notes.map((note) => note);
  if (sound === "descending") notesToPlay.reverse();
  notesToPlay.forEach((note) => {
    synth.triggerAttackRelease(note, duration, now + timeStart);
    timeStart += timeAdd;
  });
}
