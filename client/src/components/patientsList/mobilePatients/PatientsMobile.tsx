import React from 'react';
import styled from 'styled-components';
import { GetOffsetPatients_getOffsetPatients_patients } from '../../../graphql/queries/__generated__/GetOffsetPatients';
import AlphabetList from './AlphabetList';
import { AddPatientButton } from './elements';
import PatientsList from './PatientsList';

type Props = {
  patients: GetOffsetPatients_getOffsetPatients_patients[];
};

const Container = styled.div`
  position: relative;
`;

const PatientsMobile = ({ patients }: Props) => {
  return (
    <Container>
      <PatientsList patients={patients} />
      <AlphabetList />
      <AddPatientButton />
    </Container>
  );
};

export default PatientsMobile;
