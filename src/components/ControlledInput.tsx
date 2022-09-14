import React from 'react';
import {Control, Controller, FieldError} from 'react-hook-form';
import Input from './Input';

interface ControlledInputProps {
  control: Control<any>;
  name: string;
  contentType?: 'emailAddress' | 'password';
  placeholder?: string;
  errors?: FieldError;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  control,
  contentType,
  placeholder,
  errors,
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onChange, onBlur, value}}) => (
      <Input
        placeholder={placeholder}
        contentType={contentType}
        value={value as string}
        onChangeText={onChange}
        onBlur={onBlur}
        errors={errors}
        {...props}
      />
    )}
  />
);

export default ControlledInput;
