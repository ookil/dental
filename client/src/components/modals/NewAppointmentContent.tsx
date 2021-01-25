import React, { useState } from 'react';
import { openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';
import Select from '../elements/Select';
import SelectWithInput from '../elements/SelectWithInput';
import { Patient, PatientFormContent } from './AddPatientContent';
import {
  ButtonsWrapper,
  ModalTitle,
  MoreOptionButton,
  MoreOptionLink,
} from './Modals.elements';

type Appointment = {
  patientId: number | null;
  dentistId: number | null;
  treatment: string;
  startAt: string;
};

const NewAppointmentContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isNewPatient, setNewPatient] = useState(false);

  const [patientData, setPatientData] = useState<Patient>({
    name: '',
    surname: '',
    nationalId: null,
    email: null,
    dentistId: null,
  });

  const [appointmentData, setAppointmentData] = useState<Appointment>({
    dentistId: null,
    patientId: null,
    startAt: '',
    treatment: '',
  });

  const handleNewPatient = () => setNewPatient(!isNewPatient);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (key: string, value: number | string) => {
    setAppointmentData({
      ...appointmentData,
      [key]: value,
    });
  };

  return (
    <>
      <ModalTitle>New Appointment</ModalTitle>
      <form>
        {!isNewPatient && (
          <SelectWithInput
            label='patient'
            name='patientId'
            readFrom='id'
            marginBottom={1}
            handleSelectChange={handleSelectChange}
          />
        )}

        {isNewPatient && (
          <PatientFormContent
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        )}
        <MoreOptionButton onClick={handleNewPatient}>
          {isNewPatient ? 'Choose patient' : 'Create new patient'}
        </MoreOptionButton>
        <Select
          label='treatment'
          name='treatment'
          readFrom='name'
          placeholder='Please select treatment'
          marginTop={25}
          handleSelectChange={handleSelectChange}
        />
        <Select
          label='dentist'
          name='dentistId'
          readFrom='id'
          placeholder='Please select dentist'
          marginTop={25}
          handleSelectChange={handleSelectChange}
        />
        <Select
          label='available dates'
          name='startAt'
          readFrom='dateString'
          placeholder='Choose free appointment'
          marginBottom={5}
          handleSelectChange={handleSelectChange}
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
