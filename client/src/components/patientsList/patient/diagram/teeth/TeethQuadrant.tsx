import React from 'react';
import { ToothQuadrantBox } from './Teeth.elements';
import Tooth from './Tooth';

type TeethQuadrantProps = {
  quadrant: number;
  patientId: string;
};

const TeethQuadrant = ({ quadrant, patientId }: TeethQuadrantProps) => {
  let quadrantArr = [];

  for (let i = 1; i < 9; i++) {
    quadrantArr.push(
      <Tooth
        key={quadrant + i}
        patientId={patientId}
        quadrant={quadrant}
        toothNumber={i}
      />
    );
  }

  if (quadrant === 1 || quadrant === 4) {
    return (
      <ToothQuadrantBox quadrant={quadrant}>
        {quadrantArr.reverse()}
      </ToothQuadrantBox>
    );
  }

  return <ToothQuadrantBox quadrant={quadrant}>{quadrantArr}</ToothQuadrantBox>;
};

export default TeethQuadrant;
