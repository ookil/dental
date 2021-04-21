import React from 'react';
import {
  RootFill,
  RootOneSVG,
  RootThreeSVG,
  RootTwoSVG,
} from './Teeth.elements';

type ToothRootProps = {
  quadrant: number;
  toothNumber: number;
  root: RootFill;
};

const ToothRoot = ({ quadrant, toothNumber, root }: ToothRootProps) => {
  if (
    (quadrant === 1 && toothNumber === 4) ||
    (quadrant === 2 && toothNumber === 4) ||
    (quadrant === 3 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8)) ||
    (quadrant === 4 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8))
  ) {
    return <RootTwoSVG root={root} />;
  }
  if (
    (quadrant === 1 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8)) ||
    (quadrant === 2 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8))
  ) {
    return <RootThreeSVG root={root} />;
  } else {
    return <RootOneSVG root={root} />;
  }
};

export default ToothRoot;
