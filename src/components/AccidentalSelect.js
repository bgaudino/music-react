import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { FormItem } from "./Layout";

export default function AccidentalSelect(props) {
  return (
    <FormItem>
      <FormControl fullWidth>
        <InputLabel id="accidental-label">Accidental</InputLabel>
        <Select
          labelId="accidental-label"
          id="accidental"
          value={props.value}
          onChange={props.onChange}
        >
          <MenuItem value="sharp">♯ sharp</MenuItem>
          <MenuItem value="natural">♮ natural</MenuItem>
          <MenuItem value="flat">♭ flat</MenuItem>
        </Select>
      </FormControl>
    </FormItem>
  );
}
