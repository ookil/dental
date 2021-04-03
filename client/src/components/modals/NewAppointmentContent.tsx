import React from 'react';
import styled from 'styled-components';
import { openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-around;
  padding: 10px 20px;
`;

const NewAppointmentContent = () => {
  const dispatch = useAppDispatch();

  return (
    <ButtonsWrapper>
      <Button
        secondary
        width={'100%'}
        onClick={() => {
          dispatch(openModal('FIND_PATIENT'));
        }}
      >
        Find Patient
      </Button>
      <Button
        secondary
        width={'100%'}
        onClick={() => {
          dispatch(openModal('NEW_PATIENT_VISIT'));
        }}
      >
        New Patient
      </Button>
    </ButtonsWrapper>
  );
};

export default NewAppointmentContent;
