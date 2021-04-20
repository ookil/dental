import React, { useEffect, useState } from 'react';
import {
  SwitcherBackground,
  SwitcherCircle,
  SwitcherLabel,
  SwitcherWrapper,
} from './Switcher.elements';

type SwitcherProps = {
  isActive: boolean;
  keyName: string;
  trueLabel?: string;
  falseLabel?: string;
  handleSwitchChange: (key: string, value: boolean) => void;
};

const Switcher = ({
  isActive,
  keyName,
  trueLabel,
  falseLabel,
  handleSwitchChange,
}: SwitcherProps) => {
  const [state, setState] = useState(isActive);

  useEffect(() => {
    setState(isActive);
  }, [isActive]);

  const handleClick = () => {
    handleSwitchChange(keyName, !state);
  };

  return (
    <SwitcherWrapper>
      <SwitcherBackground onClick={handleClick} isActive={state}>
        <SwitcherCircle isActive={state} />
      </SwitcherBackground>
      {trueLabel && falseLabel && (
        <SwitcherLabel>{state ? trueLabel : falseLabel}</SwitcherLabel>
      )}
    </SwitcherWrapper>
  );
};

export default Switcher;
