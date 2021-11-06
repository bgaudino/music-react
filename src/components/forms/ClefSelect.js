import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { FormItem } from "../Layout";

export default function ClefSelect(props) {
  return (
    <FormItem>
      <FormControl fullWidth>
        <InputLabel id="clef-label">Clef</InputLabel>
        <Select
          labelId="clef-label"
          value={props.value}
          onChange={props.onChange}
        >
          <MenuItem value="treble">𝄞 treble</MenuItem>
          <MenuItem value="alto">𝄡 alto</MenuItem>
          <MenuItem value="bass">𝄢 bass</MenuItem>
        </Select>
      </FormControl>
    </FormItem>
  );
}
