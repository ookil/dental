import React from 'react';
import { Label, StyledInput } from './Elements';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const Input: React.FC<Props> = ({ label, required, ...inputProps }) => {
  return (
    <div>
      <Label>
        {label}
        {required && <span> *</span>}
      </Label>
      <StyledInput {...(inputProps as any)} />
    </div>
  );
};

export default Input;
