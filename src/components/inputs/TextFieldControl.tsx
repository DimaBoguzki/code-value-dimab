import { Controller, Control } from "react-hook-form";
import { TextField, Theme, SxProps, InputAdornment } from '@mui/material';

type TextFieldPropsType = {
  value: string,
  label?: string,
  placeholder?: string,
  focused?: boolean,
  error?: boolean,
  helperText?: string,
  disabled?: boolean,
  required?: boolean,
  icon?: React.ReactNode,
  rows?: number,
  isSearch?: boolean,
  sx?: SxProps<Theme> | undefined,
  onChange: ( value: string ) => void;
}

function TextFieldControl( props: {
  control: Control<any>,
  controlName: string,
  required?: boolean,
  validateFunction?: ( value: string ) => boolean | string
  validate?: {
    value: RegExp,
    message: string
  }
} & Omit<TextFieldPropsType, 'onChange' | 'value'> ) {
  const { control, controlName, validate, required, validateFunction, ...rest } = props;
  return (
    <Controller
      name={ controlName }
      control={ control }
      rules={ {
        required: !!required,
        validate: validateFunction,
        pattern: validate ? {
          ...validate,
        } : undefined,
      } }
      render={ ( { field, fieldState: { error } } ) => {
        return (
          <AppTextField
            { ...rest }
            error={ Boolean( error ) }
            helperText={ error?.message }
            value={ field.value }
            onChange={ ( value ) => field.onChange( value ) }
          />
        )
      } }
    />
  )
}

function AppTextField( props: TextFieldPropsType ) {
  const {
    label,
    placeholder,
    value,
    helperText,
    error,
    focused,
    sx,
    rows,
    icon,
    isSearch,
    onChange
  } = props;

  return (
    <TextField
      fullWidth
      autoFocus={ focused }
      label={ label ?? '' }
      placeholder={ placeholder ?? '' }
      value={ value ?? '' }
      size='small'
      type={ isSearch ? 'search' : 'text' }
      multiline={ !!rows }
      rows={ rows ?? 1 }
      error={ !!error }
      helperText={ helperText ?? '' }
      onChange={ ( e ) => onChange( e.target.value ) }
      InputLabelProps={ { shrink: true } }
      sx={ { ...( sx || {} ) } }
      InputProps={ {
        startAdornment: icon && (
          <InputAdornment position="start">
            { icon }
          </InputAdornment>
        ),
      } }
    />
  )
}

export {
  AppTextField,
  TextFieldControl,
  type TextFieldPropsType
}

