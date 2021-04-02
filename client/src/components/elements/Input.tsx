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
  sizing?: 'small' | 'big';
  layout?: 'primary' | 'secondary';
}

const Input: React.FC<Props> = ({
  label,
  marginBottom,
  marginTop,
  isError,
  errorMsg,
  layout,
  ...inputProps
}) => {
  return (
    <InputContainer
      marginBottom={marginBottom}
      marginTop={marginTop}
      layout={layout}
    >
      <Label layout={layout}>
        {label}
        {inputProps.required && <span> *</span>}
        {isError && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </Label>
      <StyledInput {...(inputProps as any)} isError={isError} />
    </InputContainer>
  );
};

export default Input;
