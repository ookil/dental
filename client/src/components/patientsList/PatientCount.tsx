import React from 'react';
import styled from 'styled-components';
import { color, size } from '../../globalStyles';
import { Wrapper, Text } from './Patients.elements';

const { bluePrimary } = color;

const Count = styled.div`
  font-size: 1.5rem;
  color: ${bluePrimary};
  margin-right: 10px;
  font-weight: bold;

  @media (max-width: ${size.mobileL}) {
    font-size: 1rem;
  } ;
`;

const PatientCount = ({ count }: { count: number }) => {
  return (
    <Wrapper>
      <Count>{count}</Count>
      <Text>{count === 1 ? 'patient' : 'patients'}</Text>
    </Wrapper>
  );
};

export default PatientCount;
