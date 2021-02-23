import React from 'react';
import { ErrorMessage, InputContainer, Label, StyledInput } from './Elements';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  marginBottom?: number;
  marginTop?: number;
  isError?: boolean;
  errorMsg?: string;
  sizing?: 'big';
}

const Input: React.FC<Props> = ({
  label,
  marginBottom,
  marginTop,
  isError,
  errorMsg,
  ...inputProps
}) => {
  return (
    <InputContainer marginBottom={marginBottom} marginTop={marginTop}>
      <Label>
        {label}
        {inputProps.required && <span> *</span>}
        {isError && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </Label>
      <StyledInput {...(inputProps as any)} isError={isError} />
    </InputContainer>
  );
};

export default Input;
