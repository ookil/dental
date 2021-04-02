import React, { useLayoutEffect, useRef } from 'react';
import { DateInput } from './DayPickerInput.elements';

export interface InputBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

const InputBox = ({ focus, width, ...rest }: InputBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus) {
        inputRef.current.focus();
      }
    }
  }, [focus]);

  return <DateInput ref={inputRef} width={width} {...rest} />;
};

export default InputBox;


