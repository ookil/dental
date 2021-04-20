import React from 'react';
import {
  CrownSVG,
  RootOneSVG,
  RootThreeSVG,
  RootTwoSVG,
  StyledTooth,
  ToothNumber,
  ToothRoot,
  ToothWrapper,
} from './Teeth.elements';

type ToothProps = {
  toothNumber: number;
  quadrant: number;
};

const getRoot = (quadrant: number, toothNumber: number) => {
  if (
    (quadrant === 1 && toothNumber === 4) ||
    (quadrant === 2 && toothNumber === 4) ||
    (quadrant === 3 && (toothNumber === 6 || toothNumber === 7)) ||
    (quadrant === 4 && (toothNumber === 6 || toothNumber === 7))
  ) {
    return <RootTwoSVG />;
  }
  if (
    (quadrant === 1 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8)) ||
    (quadrant === 2 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8)) ||
    (quadrant === 3 && toothNumber === 8) ||
    (quadrant === 4 && toothNumber === 8)
  ) {
    return <RootThreeSVG />;
  } else {
    return <RootOneSVG />;
  }
};

const Tooth = ({ quadrant, toothNumber }: ToothProps) => {
  if (quadrant === 1 || quadrant === 2) {
    return (
      <ToothWrapper>
        <StyledTooth>
          <ToothRoot quadrant={quadrant}>
            {getRoot(quadrant, toothNumber)}
          </ToothRoot>
          <CrownSVG />
        </StyledTooth>
        <ToothNumber>{toothNumber}</ToothNumber>
      </ToothWrapper>
    );
  }

  return (
    <ToothWrapper>
      <ToothNumber>{toothNumber}</ToothNumber>
      <StyledTooth>
        <CrownSVG />
        <ToothRoot quadrant={quadrant}>
          {getRoot(quadrant, toothNumber)}
        </ToothRoot>
      </StyledTooth>
    </ToothWrapper>
  );
};

export default Tooth;
