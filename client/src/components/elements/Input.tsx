import React from 'react';
import { InputContainer, Label, StyledInput } from './Elements';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  marginBottom?: number;
  marginTop?: number;
}

const Input: React.FC<Props> = ({
  label,
  required,
  marginBottom,
  marginTop,
  ...inputProps
}) => {
  return (
    <InputContainer marginBottom={marginBottom} marginTop={marginTop}>
      <Label>
        {label}
        {required && <span> *</span>}
      </Label>
      <StyledInput {...(inputProps as any)} />
    </InputContainer>
  );
};

export default Input;
