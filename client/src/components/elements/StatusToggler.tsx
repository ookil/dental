import React, { useState } from 'react';
import { Label } from './Elements';
import { StatusButton, Wrapper } from './Status.Toggler.elements';
import { color } from '../../globalStyles';

const { greenConfirm, yellowUnknow, pinkCancel } = color;

type Props = {
  label?: string;
  sizing?: 'big';
  value: string;
  confirmText?: string;
  registerText?: string;
  cancelText?: string;
  showConfirm?: boolean;
  showRegister?: boolean;
  showCancel?: boolean;
  onToggleChange: (status: string) => void;
};

export const StatusToggler = ({
  label,
  sizing,
  value,
  showConfirm = true,
  confirmText,
  showRegister = true,
  registerText,
  showCancel = true,
  cancelText,
  onToggleChange,
}: Props) => {
  const [isClicked, setClicked] = useState(value);

  const handleClick = (status: string) => {
    setClicked(status);
    onToggleChange(status);
  };

  return (
    <>
      {label && <Label sizing={sizing}>{label}</Label>}
      <Wrapper>
        {showConfirm && (
          <StatusButton
            color={greenConfirm}
            text={confirmText}
            active={isClicked === 'CONFIRMED'}
            onClick={() => handleClick('CONFIRMED')}
          />
        )}
        {showRegister && (
          <StatusButton
            color={yellowUnknow}
            text={registerText}
            active={isClicked === 'REGISTERED'}
            onClick={() => handleClick('REGISTERED')}
          />
        )}
        {showCancel && (
          <StatusButton
            color={pinkCancel}
            text={cancelText}
            active={isClicked === 'CANCELED'}
            onClick={() => handleClick('CANCELED')}
          />
        )}
      </Wrapper>
    </>
  );
};

export default StatusToggler;
