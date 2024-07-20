import { forwardRef } from 'react';
import { NumericFormat as NNumericFormat, NumericFormatProps } from 'react-number-format';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { Control, Controller } from 'react-hook-form';


type NumericFieldControlProps = {
  label: string,
  error?: boolean,
  value: string,
  placeholder?: string,
  icon?: JSX.Element,
  prefix?: string,
  thousandSeparator?: boolean,
  variant?: 'standard' | 'filled' | 'outlined';
  helperText?: string,
  onChange: ( value: string ) => void
}

type NNumericFormatProps = {
  onChange?: ( event: { target: { value: string } } ) => void;
  prefix?: string;
  thousandSeparator?: boolean;
}

const NumericFormat = forwardRef<NumericFormatProps, NNumericFormatProps>(
  function NumericFormatCustom( props, ref ) {
    const { onChange, thousandSeparator, ...other } = props;
    return (
      <NNumericFormat
        { ...other }
        getInputRef={ ref }
        onValueChange={ ( value ) => {
          if ( onChange ) {
            onChange( {
              target: {
                value: value.value,
              },
            } );
          }
        } }
        thousandSeparator={ false }
        valueIsNumericString
        prefix={ props.prefix }
      />
    );
  },
);

function NumericTextField( props: NumericFieldControlProps ) {
  const {
    label,
    prefix,
    error,
    icon,
    thousandSeparator,
    value,
    variant,
    placeholder,
    helperText,
    onChange,
  } = props;
  return (
    <TextField
      size='small'
      fullWidth
      variant={ variant ?? 'outlined' }
      error={ Boolean( error ) }
      label={ label }
      value={ value }
      helperText={ helperText ?? '' }
      onChange={ e => {
        onChange( e.target.value )
      } }
      InputLabelProps={ { shrink: true } }
      placeholder={ placeholder ?? '' }
      InputProps={ {
        inputComponent: NumericFormat as any,
        inputProps: {
          thousandSeparator: Boolean( thousandSeparator ),
          prefix: prefix,
        },
        startAdornment: icon ? (
          <InputAdornment position="start">
            { icon }
          </InputAdornment>
        ) : undefined,
      } }
    />
  );
}

function NumericTextFieldControl( props: {
  control: Control<any>,
  controlName: string,
  required?: boolean,
  validateFunction?: ( value: string ) => boolean | string
  validate?: {
    value: RegExp,
    message: string
  }
} & Omit<NumericFieldControlProps, 'onChange' | 'value'> ) {
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
          <NumericTextField
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


export { NumericFormat, NumericTextField }
export default NumericTextFieldControl