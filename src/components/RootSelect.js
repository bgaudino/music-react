import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {alphabet} from  './musicConstants';

export default function RootSelect(props) {
    
    return (
        <FormControl >
          <InputLabel id="root-label">Root</InputLabel>
          <Select labelId="root-label" id="root" value={props.value} onChange={props.onChange}>
            {alphabet.map(note => <MenuItem key={note} value={note}>{note}</MenuItem>)}
          </Select>
        </FormControl>
    )
}