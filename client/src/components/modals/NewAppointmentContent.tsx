import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import {
  openModal,
  setAvailableAppointments,
  setPatients,
} from '../../store/slices/modalsSlice';
import { useAppDispatch, RootState } from '../../store/store';
import CustomDayPicker from '../daypicker/CustomDayPicker';
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
  patientId: number | string;
  dentistId: number | string;
  treatment: string;
  startAt: string;
};

const NewAppointmentContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const availableAppointments = useSelector(
    (state: RootState) => state.modal.availableAppointments
  );

  const [isNewPatient, setNewPatient] = useState(false);
  const [patientData, setPatientData] = useState<Patient>({
    name: '',
    surname: '',
    nationalId: null,
    email: null,
    dentistId: null,
  });

  const [appointmentData, setAppointmentData] = useState<Appointment>({
    dentistId: '',
    patientId: '',
    startAt: '',
    treatment: '',
  });

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

  const { data: treatmentQuery } = useQuery<TreatmentData, TreatmentCategory>(
    GET_TREATMENTS
  );

  const treatments = treatmentQuery && treatmentQuery.treatments;

  const handleNewPatient = () => setNewPatient(!isNewPatient);

  //handles new patient inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  //handles new appointment select options
  const handleSelectChange = (key: string, value: number | string) => {
    setAppointmentData({
      ...appointmentData,
      [key]: value,
    });
  };

  if (loading || dentistLoading) return <p>Loading...</p>;

  const handleCancel = () => {
    dispatch(openModal(false));
    dispatch(setAvailableAppointments([]));
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
          fieldName='treatment'
          readFrom='name'
          displayValue='name'
          placeholder='Please select treatment'
          options={treatments}
          marginTop={25}
          handleSelectChange={handleSelectChange}
        />
        <Select
          label='dentist'
          fieldName='dentistId'
          displayValue='nameWithSurname'
          readFrom='id'
          placeholder='Please select dentist'
          options={dentists}
          marginTop={25}
          handleSelectChange={handleSelectChange}
        />

        <CustomDayPicker dentistId={appointmentData.dentistId} />

        {availableAppointments.length > 0 && (
          <Select
            fieldName='startAt'
            readFrom='dateString'
            displayValue='formatedDate'
            placeholder='Select day'
            options={availableAppointments}
            marginBottom={5}
            handleSelectChange={handleSelectChange}
          />
        )}
        <MoreOptionLink
          to='/calendar'
          onClick={() => dispatch(openModal(false))}
        >
          Visit calendar
        </MoreOptionLink>
      </form>
      <ButtonsWrapper>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button primary>Confirm</Button>
      </ButtonsWrapper>
    </>
  );
};

export default NewAppointmentContent;
