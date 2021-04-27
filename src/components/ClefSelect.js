import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

export default function ClefSelect(props) {
    
    return (
      <FormControl>
        <InputLabel id="clef-label">Accidental</InputLabel>
        <Select labelId="clef-label" id="accidental" value={props.value} onChange={props.onChange}>
          <MenuItem value="treble">𝄞 treble</MenuItem>
          <MenuItem value="alto">𝄡 alto</MenuItem>
          <MenuItem value="bass">𝄢 bass</MenuItem>
        </Select>
    </FormControl>
    )
}