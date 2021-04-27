import React from 'react';
import { PatientContainer } from '../Patients.elements';
import ActionTypeBox from './diagram/ActionTypeBox';
import {
  DiagramBox,
  DiagramBoxRoot,
  DiagramOptionsWrapper as DiagramWrapper,
  DiagramSeparator,
} from './diagram/Diagram.elements';
import TeethQuadrant from './diagram/TeethQuadrant';
import { OptionsWrapper } from './diagram/DiagramOptions.elements';
import DiagramOptions from './diagram/DiagramOptions';

const PatientDiagramContent = () => {
  //query for all patient teeth info

  return (
    <DiagramWrapper>
      <DiagramBoxRoot>
        <DiagramBox>
          <TeethQuadrant quadrant={1} />
          <TeethQuadrant quadrant={2} />
          <TeethQuadrant quadrant={4} />
          <TeethQuadrant quadrant={3} />
          <DiagramSeparator />
        </DiagramBox>
      </DiagramBoxRoot>

      {/* right side panels */}
      <DiagramOptions />
    </DiagramWrapper>

    // box for chart input grid
  );
};

export default PatientDiagramContent;
