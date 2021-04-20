import React from 'react';
import { PatientContainer } from '../Patients.elements';
import { DiagramBox, DashedSeparator } from './diagram/Diagram.elements';
import TeethQuadrant from './diagram/TeethQuadrant';

const PatientDiagramContent = () => {
  return (
    <PatientContainer>
      <DiagramBox>
        <TeethQuadrant quadrant={1} />
        <TeethQuadrant quadrant={2} />
        <TeethQuadrant quadrant={4} />
        <TeethQuadrant quadrant={3} />
      </DiagramBox>
    </PatientContainer>
  );
};

export default PatientDiagramContent;
