import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {
  ClinicDentistsData,
  ClinicDentistVar,
  GET_CLINIC_DENTISTS,
} from '../../graphql/queries/dentist';
import {
  ClinicPatientData,
  ClinicPatientVar,
  GET_CLINIC_PATIENTS,
} from '../../graphql/queries/patient';
import {
  GET_TREATMENTS,
  TreatmentCategory,
  TreatmentData,
} from '../../graphql/queries/treatment';
import { openModal, setPatients } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';
import Select from '../elements/Select';
import SelectWithInput from '../elements/SelectWithInput';
import { Patient } from './AddPatientContent';
import {
  ButtonsWrapper,
  ModalTitle,
  MoreOptionButton,
  MoreOptionLink,
} from './Modals.elements';
import { PatientFormContent } from './PatientFormContent';

type Appointment = {
  patientId: number | null;
  dentistId: number | null;
  treatment: string;
  startAt: string;
};

const NewAppointmentContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isNewPatient, setNewPatient] = useState(false);

  const { loading, data: patientQuery } = useQuery<
    ClinicPatientData,
    ClinicPatientVar
  >(GET_CLINIC_PATIENTS, {
    variables: {
      clinicId: 7,
    },
  });

  const patients = patientQuery && patientQuery.clinicPatients;
  if (patients) dispatch(setPatients(patients));

  const { loading: dentistLoading, data: dentistQuery } = useQuery<
    ClinicDentistsData,
    ClinicDentistVar
  >(GET_CLINIC_DENTISTS, {
    variables: {
      clinicId: 7,
    },
  });

  const dentists = dentistQuery && dentistQuery.clinicDentists;

  const { loading: treatmentLoading, data: treatmentQuery } = useQuery<
    TreatmentData,
    TreatmentCategory
  >(GET_TREATMENTS);

  const treatments = treatmentQuery && treatmentQuery.treatments;

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

  if (loading || dentistLoading) return <p>Loading...</p>;

  return (
    <>
      <ModalTitle>New Appointment</ModalTitle>
      <form>
        {!isNewPatient && (
          <SelectWithInput
            label='patient'
            name='patientId'
            readFrom='id'
            options={patients}
            marginBottom={1}
            handleSelectChange={handleSelectChange}
          />
        )}

        {isNewPatient && (
          <PatientFormContent
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            options={dentists}
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
          options={treatments}
          marginTop={25}
          handleSelectChange={handleSelectChange}
        />
        <Select
          label='dentist'
          name='dentistId'
          readFrom='id'
          placeholder='Please select dentist'
          options={dentists}
          marginTop={25}
          handleSelectChange={handleSelectChange}
        />
        <Select
          label='available dates'
          name='startAt'
          readFrom='dateString'
          placeholder='Choose dentist first'
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
