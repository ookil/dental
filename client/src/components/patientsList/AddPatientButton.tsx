import React from 'react';
import styled from 'styled-components';
import { color } from '../../globalStyles';
import { Wrapper, Text } from './Patients.elements';
import { size } from '../../globalStyles';

const { bluePrimary } = color;

const Icon = styled.div`
  background-color: ${bluePrimary};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  line-height: 18px;
  margin-right: 10px;
`;

const ButtonWrapper = styled(Wrapper)`
  cursor: pointer;

  &:hover ${Icon} {
    color: ${bluePrimary};
    background-color: white;
    border: 1px solid ${bluePrimary};
  }

  @media (max-width: ${size.mobileL}) {
    display: none;
  };
`;

const AddPatientButton = () => {
  return (
    <ButtonWrapper>
      <Icon>+</Icon>
      <Text>Add patient</Text>
    </ButtonWrapper>
  );
};

export default AddPatientButton;
