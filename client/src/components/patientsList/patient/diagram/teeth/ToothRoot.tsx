import React from 'react';
import { GetPatientTeeth_patientTeeth_root } from '../../../../../graphql/queries/__generated__/GetPatientTeeth';
import { RootOneSVG, RootThreeSVG, RootTwoSVG } from './Teeth.elements';

type ToothRootProps = {
  quadrant: number;
  toothNumber: number;
  root: GetPatientTeeth_patientTeeth_root | null | undefined;
  isTarget?: boolean;
  selectedColor?: string;
  handleSurfaceSelection: (surfaceId: string) => void;
};

const ToothRoot = ({
  quadrant,
  toothNumber,
  root,
  isTarget,
  selectedColor,
  handleSurfaceSelection,
}: ToothRootProps) => {
  if (
    (quadrant === 1 && toothNumber === 4) ||
    (quadrant === 2 && toothNumber === 4) ||
    (quadrant === 3 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8)) ||
    (quadrant === 4 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8))
  ) {
    return (
      <RootTwoSVG
        root={root}
        isTarget={isTarget}
        selectedColor={selectedColor}
        handleSurfaceSelection={handleSurfaceSelection}
      />
    );
  }
  if (
    (quadrant === 1 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8)) ||
    (quadrant === 2 &&
      (toothNumber === 6 || toothNumber === 7 || toothNumber === 8))
  ) {
    return (
      <RootThreeSVG
        root={root}
        isTarget={isTarget}
        selectedColor={selectedColor}
        handleSurfaceSelection={handleSurfaceSelection}
      />
    );
  } else {
    return (
      <RootOneSVG
        root={root}
        isTarget={isTarget}
        selectedColor={selectedColor}
        handleSurfaceSelection={handleSurfaceSelection}
      />
    );
  }
};

export default ToothRoot;
