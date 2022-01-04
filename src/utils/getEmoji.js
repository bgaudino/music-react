export function getEmoji(numAttempts, numCorrect) {
  if (numAttempts === 0) {
    return null;
  }
  const pct = (numCorrect / numAttempts) * 100;
  if (pct > 90) return "😁";
  else if (pct > 80) return "😀";
  else if (pct > 70) return "😐";
  else if (pct > 60) return "😟";
  else return "😭";
}
