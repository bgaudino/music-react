import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { modes } from "../../utils/musicConstants";

export default function ModeSelect(props) {
  const { scaleType, onChange, value } = props;
  return (
      <FormControl fullWidth>
        <InputLabel id="mode-label">Mode</InputLabel>
        <Select value={value} onChange={onChange}>
          {scaleType === "major"
            ? modes.major.map((mode) => (
                <MenuItem key={mode} value={modes.major.indexOf(mode)}>
                  {mode}
                </MenuItem>
              ))
            : null}
          {scaleType === "harmonic minor"
            ? modes.harmonicMinor.map((mode) => (
                <MenuItem key={mode} value={modes.harmonicMinor.indexOf(mode)}>
                  {mode}
                </MenuItem>
              ))
            : null}
          {scaleType === "melodic minor"
            ? modes.melodicMinor.map((mode) => (
                <MenuItem key={mode} value={modes.melodicMinor.indexOf(mode)}>
                  {mode}
                </MenuItem>
              ))
            : null}
          {scaleType === "harmonic major"
            ? modes.harmonicMinor.map((mode) => (
                <MenuItem key={mode} value={modes.harmonicMinor.indexOf(mode)}>
                  {mode}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
  );
}
