import React from 'react';
import { SwitcherBackground, SwitcherCircle } from './Switcher.elements';

const Switcher = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      <SwitcherBackground isActive={isActive}>
        <SwitcherCircle isActive={isActive} />
      </SwitcherBackground>
    </>
  );
};

export default Switcher;
