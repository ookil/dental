import React from 'react';
import { PatientContainer } from '../Patients.elements';
import {
  DiagramBox,
  DiagramSeparator,
} from './diagram/Diagram.elements';
import TeethQuadrant from './diagram/TeethQuadrant';

const PatientDiagramContent = () => {

    //query for all patient teeth info 

  return (
    <PatientContainer>
      <DiagramBox>
        <TeethQuadrant quadrant={1} />
        <TeethQuadrant quadrant={2} />
        <TeethQuadrant quadrant={4} />
        <TeethQuadrant quadrant={3} />
        <DiagramSeparator />
      </DiagramBox>
    </PatientContainer>
  );
};

export default PatientDiagramContent;
