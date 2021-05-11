import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { clinicIdVar } from '../../../../cache';
import { DIAGRAM_CATEGORIES } from '../../../../graphql/queries/diagramCategories';
import {
  GetDiagramCategories,
  GetDiagramCategoriesVariables,
} from '../../../../graphql/queries/__generated__/GetDiagramCategories';
import { Gif, GifWrapper } from '../../../elements/Elements';

import {
  BottomRowWrapper,
  ChangeButton,
  ChangeButtonsWrapper,
  DiagramBox,
  DiagramBoxRoot,
  DiagramOptionsWrapper as TopRowWrapper,
  DiagramSeparator,
} from '../diagram/Diagram.elements';
import DiagramGrid from '../diagram/diagramGrid/DiagramGrid';
import DiagramOptions from '../diagram/DiagramOptions';
import TeethQuadrant from '../diagram/teeth/TeethQuadrant';
import loadingGif from '../../../../images/loading.gif';
import {
  GetPatientTeeth,
  GetPatientTeethVariables,
} from '../../../../graphql/queries/__generated__/GetPatientTeeth';
import { GET_PATIENT_TEETH } from '../../../../graphql/queries/teeth';
import { useAppDispatch } from '../../../../store/store';
import {
  deleteSelection,
  discardDiagram,
} from '../../../../store/slices/diagramSlice';
import Select from '../../../elements/Select';

type PatientDiagramProps = {
  patientId: string;
};

const selectedAppointment = {
  id: '1',
  startAt: new Date(),
};

const app = [
  { id: '1', startAt: 'Mon, 12 Jan 2020' },
  { id: '2', startAt: 'Tue, 23 April 2021' },
];

const PatientDiagramContent = ({ patientId }: PatientDiagramProps) => {
  //query for all patient teeth info
  const clinicId = clinicIdVar();
  const [selection, setSelection] = useState<(string | number)[]>([]);

  const [isSelectedAppointment] = useState(false);

  const dispatch = useAppDispatch();

  const { loading: loadingTeeth } = useQuery<
    GetPatientTeeth,
    GetPatientTeethVariables
  >(GET_PATIENT_TEETH, {
    variables: {
      patientId,
    },
  });

  const { loading: loadingCategories } = useQuery<
    GetDiagramCategories,
    GetDiagramCategoriesVariables
  >(DIAGRAM_CATEGORIES, {
    variables: {
      clinicId,
    },
  });

  if (loadingCategories || loadingTeeth) {
    return (
      <GifWrapper>
        <Gif src={loadingGif} />
      </GifWrapper>
    );
  }

  const handleDiscard = () => {
    dispatch(discardDiagram());
  };

  const handleDelete = () => {
    dispatch(deleteSelection(selection));
    setSelection([]);
  };

  return (
    <>
      <TopRowWrapper>
        <DiagramBoxRoot>
          <DiagramBox>
            <TeethQuadrant patientId={patientId} quadrant={1} />
            <TeethQuadrant patientId={patientId} quadrant={2} />
            <TeethQuadrant patientId={patientId} quadrant={4} />
            <TeethQuadrant patientId={patientId} quadrant={3} />
            <DiagramSeparator />
          </DiagramBox>
        </DiagramBoxRoot>
        {/* right side panels */}
        {isSelectedAppointment ? (
          <DiagramOptions />
        ) : (
          <Select
            fieldName='d'
            readFrom='startAt'
            displayValue='startAt'
            options={app}
            handleSelectChange={(e) => console.log(e)}
          />
        )}
      </TopRowWrapper>

      <BottomRowWrapper>
        {isSelectedAppointment && <ChangeButtonsWrapper>
          <ChangeButton primary>Save</ChangeButton>

          <ChangeButton onClick={handleDiscard}>Discard</ChangeButton>
          {selection.length > 0 && (
            <ChangeButton deleteBtn onClick={handleDelete}>
              Delete
            </ChangeButton>
          )}
        </ChangeButtonsWrapper>}
        <div style={{ width: 'calc(100% - 90px)' }}>
          <DiagramGrid
            selection={selection}
            setSelection={setSelection}
            selectedAppointment={isSelectedAppointment}
          />
        </div>
      </BottomRowWrapper>
    </>
  );
};

export default PatientDiagramContent;
