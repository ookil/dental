import React, { useState } from 'react';
import {
  DynamicTextArea,
  StyledTextArea,
  TextAreaLabel,
} from './TextArea.elements';

type TextAreaProps = {
  label?: string;
  content?: string;
};

const TextArea = ({ label, content }: TextAreaProps) => {
  const [isActive, setActive] = useState(false);

  return (
    <DynamicTextArea>
      <StyledTextArea
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        value={content}
      />
      <TextAreaLabel isActive={content ? true : isActive}>
        {label}
      </TextAreaLabel>
    </DynamicTextArea>
  );
};

export default TextArea;
