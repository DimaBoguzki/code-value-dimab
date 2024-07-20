import { MenuItem, TextField } from "@mui/material";

function SelectApp( props: {
  label: string;
  value: string;
  options: string[];
  onChange: ( value: string ) => void;
} ) {
  const { label, options, value, onChange } = props
  return (
    <TextField
      select
      fullWidth
      variant="outlined"
      size="small"
      label={ label }
      InputLabelProps={ { shrink: true } }
      placeholder='Select'
      value={ value }
      onChange={ ( e ) => onChange( e.target.value ) }
      SelectProps={ {
        placeholder: 'Select',
        value: value,
      } }
    >
      { options.map( ( item ) => (
        <MenuItem key={ item } value={ item } >
          { item }
        </MenuItem>
      ) ) }
    </TextField>
  )
}

export default SelectApp;