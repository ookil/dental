import React, { useState } from 'react';
import { openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';
import Input from '../elements/Input';
import Select from '../elements/Select';
import SelectWithInput from '../elements/SelectWithInput';
import { PatientFormContent } from './AddPatientContent';
import {
  ButtonsWrapper,
  ModalTitle,
  MoreOptionButton,
  MoreOptionLink,
} from './Modals.elements';

const NewAppointmentContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isNewPatient, setNewPatient] = useState(false);

  const handleNewPatient = () => setNewPatient(!isNewPatient);

  return (
    <>
      <ModalTitle>New Appointment</ModalTitle>
      <form>
        {!isNewPatient && <SelectWithInput label='patient' marginBottom={1} />}

        {isNewPatient && <PatientFormContent />}
        <MoreOptionButton onClick={handleNewPatient}>
          {isNewPatient ? 'Choose patient' : 'Create new patient'}
        </MoreOptionButton>
        <Select
          label='dentist'
          placeholder='Please select dentist'
          marginTop={25}
        />
        <Select
          label='available dates'
          placeholder='Choose free appointment'
          marginBottom={5}
        />
        <MoreOptionLink
          to='/calendar'
          onClick={() => dispatch(openModal(false))}
        >
          Visit calendar
        </MoreOptionLink>
      </form>
      <ButtonsWrapper>
        <Button onClick={() => dispatch(openModal(false))}>Cancel</Button>
        <Button primary>Confirm</Button>
      </ButtonsWrapper>
    </>
  );
};

export default NewAppointmentContent;
