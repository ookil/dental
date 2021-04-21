import React from 'react';
import { CrownSVG } from './CrownSVG';
import { StyledTooth, ToothNumber, ToothWrapper } from './Teeth.elements';
import ToothRoot from './ToothRoot';

type ToothProps = {
  toothNumber: number;
  quadrant: number;
};

const patientTeeth = [
  {
    id: '13',
    quadrant: 1,
    toothNumber: 3,
    crown: {
      buccal: 'yellow',
      mesial: 'skyblue',
      occlusal: 'green',
    },
    root: {
      rootOne: 'red',
    },
  },
  {
    id: '21',
    quadrant: 2,
    toothNumber: 1,
    crown: {
      buccal: 'red',
      mesial: 'skyblue',
    },
    root: {},
  },
];

const Tooth = ({ quadrant, toothNumber }: ToothProps) => {
  /* const tooth = patientTeeth.quadrant[1].teeth.find(
    (tooth) => tooth.id === toothNumber
  ); */

  const tooth = patientTeeth.find(
    (tooth) => tooth.quadrant === quadrant && tooth.toothNumber === toothNumber
  );

  if (quadrant === 1 || quadrant === 2) {
    return (
      <ToothWrapper>
        <StyledTooth quadrant={quadrant}>
          <CrownSVG crown={tooth?.crown || {}} />
          <ToothRoot
            root={tooth?.root || {}}
            quadrant={quadrant}
            toothNumber={toothNumber}
          />
        </StyledTooth>
        <ToothNumber>{toothNumber}</ToothNumber>
      </ToothWrapper>
    );
  }

  return (
    <ToothWrapper>
      <ToothNumber>{toothNumber}</ToothNumber>
      <StyledTooth quadrant={quadrant}>
        <CrownSVG crown={tooth?.crown || {}} />
        <ToothRoot
          root={tooth?.root || {}}
          quadrant={quadrant}
          toothNumber={toothNumber}
        />
      </StyledTooth>
    </ToothWrapper>
  );
};

export default Tooth;
