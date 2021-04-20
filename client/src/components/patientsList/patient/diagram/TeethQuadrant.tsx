import React from 'react';
import { ToothQuadrant } from './Teeth.elements';
import Tooth from './Tooth';

type TeethQuadrantProps = {
  quadrant: number;
};

const TeethQuadrant = ({ quadrant }: TeethQuadrantProps) => {
  let quadrantArr = [];

  for (let i = 1; i < 9; i++) {
    quadrantArr.push(
      <Tooth key={quadrant + i} quadrant={quadrant} toothNumber={i} />
    );
  }

  if (quadrant === 1 || quadrant === 4) {
    return (
      <ToothQuadrant quadrant={quadrant}>{quadrantArr.reverse()}</ToothQuadrant>
    );
  }

  return <ToothQuadrant quadrant={quadrant}>{quadrantArr}</ToothQuadrant>;
};

export default TeethQuadrant;
