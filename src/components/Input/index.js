import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({error,title,type,value,name,onBlur,className,onChange,helperText}) {
  return (
        <TextField 
        error={error}
        fullWidth={true} 
        value={value} 
        name={name} 
        onBlur={onBlur} 
        type={type} 
        onChange={onChange} 
        id={error?"filled-error-helper-text":"filled-basic"} 
        className={className} 
        label={title} 
        variant="filled" 
        helperText={helperText}
        />
  );
}
