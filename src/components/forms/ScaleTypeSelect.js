import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { scaleTypes } from '../../utils/musicConstants';

export default function ScaleTypeSelect(props) {
  return (
      <FormControl fullWidth>
        <InputLabel id="scale-type-label">Scale type</InputLabel>
        <Select
          value={props.value}
          onChange={props.onChange}
        >
          {scaleTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
