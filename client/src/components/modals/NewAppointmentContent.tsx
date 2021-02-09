import { useMutation, useQuery } from '@apollo/client';
import { addMinutes } from 'date-fns';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CreateAppointment,
  CreateAppointmentInput,
  CREATE_APPOINTMENT,
} from '../../graphql/queries/appointments';
import {
  ClinicDentistsData,
  ClinicDentistVar,
  GET_CLINIC_DENTISTS,
} from '../../graphql/queries/dentist';
import {
  ClinicPatientData,
  ClinicPatientVar,
  GET_CLINIC_PATIENTS,
  NewPatientDetails,
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
import { BigErrorMessage, Button, Gif, GifWrapper } from '../elements/Elements';
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
import loadingGif from '../../images/loading.gif';
import completedGif from '../../images/completed.gif';
import {
  ClinicData,
  ClinicVar,
  GET_CLINIC,
} from '../../graphql/queries/clinic';
import { clinicIdVar } from '../../cache';

type Appointment = {
  patientId: number | string;
  dentistId: number | string;
  treatment: string;
  startAt: string;
  endAt: string;
};

const NewAppointmentContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isCompleted, setCompleted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const availableAppointments = useSelector(
    (state: RootState) => state.modal.availableAppointments
  );

  const clinicId = clinicIdVar();

  const { data: clinicData } = useQuery<ClinicData, ClinicVar>(GET_CLINIC, {
    variables: {
      clinicId,
    },
  });

  const duration = clinicData?.clinic.settings.appointmentDuration;

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
    endAt: '',
    treatment: '',
  });

  const {
    loading: patientsLoading,
    data: patientQuery,
    error: patientsError,
  } = useQuery<ClinicPatientData, ClinicPatientVar>(GET_CLINIC_PATIENTS, {
    variables: {
      clinicId,
    },
    skip: clinicId === undefined,
  });

  const patients = patientQuery && patientQuery.clinicPatients;
  if (patients) dispatch(setPatients(patients));

  const {
    loading: dentistLoading,
    data: dentistQuery,
    error: dentistsError,
  } = useQuery<ClinicDentistsData, ClinicDentistVar>(GET_CLINIC_DENTISTS, {
    variables: {
      clinicId,
    },
    skip: clinicId === undefined,
  });

  const dentists = dentistQuery && dentistQuery.clinicDentists;

  const {
    data: treatmentQuery,
    loading: treatmentsLoading,
    error: treatmentsError,
  } = useQuery<TreatmentData, TreatmentCategory>(GET_TREATMENTS);

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
    setAppointmentData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCancel = () => {
    dispatch(openModal(false));
    dispatch(setAvailableAppointments([]));
  };

  const [
    createAppointment,
    { error: createAppointmentError, loading: loadingCreateAppointment },
  ] = useMutation<
    { createAppointment: CreateAppointment },
    {
      appointmentData: CreateAppointmentInput;
      newPatientData?: NewPatientDetails;
    }
  >(CREATE_APPOINTMENT, {
    onCompleted() {
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        dispatch(openModal(false));
      }, 2000);
    },
  });

  if (appointmentData.startAt && duration)
    appointmentData.endAt = addMinutes(
      new Date(appointmentData.startAt),
      duration
    ).toISOString();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (appointmentData.dentistId === '')
      setErrors((errors) => [...errors, 'dentist']);
    if (appointmentData.startAt === '')
      setErrors((errors) => [...errors, 'startAt']);
    if (appointmentData.patientId === '')
      setErrors((errors) => [...errors, 'patient']);
    if (appointmentData.treatment === '')
      setErrors((errors) => [...errors, 'treatment']);

    const isAppointmentData =
      appointmentData.dentistId &&
      appointmentData.endAt &&
      appointmentData.startAt &&
      appointmentData.treatment
        ? true
        : false;

    if (isNewPatient) {
      if (patientData.name === '') setErrors((errors) => [...errors, 'name']);
      if (patientData.surname === '')
        setErrors((errors) => [...errors, 'surname']);
      if (patientData.nationalId === null)
        setErrors((errors) => [...errors, 'nationalId']);
      if (patientData.dentistId === null)
        setErrors((errors) => [...errors, 'dentistId']);
      if (
        patientData.name &&
        patientData.surname &&
        patientData.nationalId &&
        patientData.dentistId &&
        isAppointmentData
      ) {
        createAppointment({
          variables: {
            appointmentData: { ...appointmentData, clinicId },
            newPatientData: { ...patientData, clinicId },
          },
        });
      }
    } else {
      if (isAppointmentData) {
        createAppointment({
          variables: {
            appointmentData: { ...appointmentData, clinicId },
          },
        });
      }
    }
  };

  if (
    patientsError ||
    dentistsError ||
    treatmentsError ||
    createAppointmentError
  ) {
    setTimeout(() => dispatch(openModal(false)), 2000);
    return (
      <BigErrorMessage>Something went wrong, please try again</BigErrorMessage>
    );
  }

  if (isCompleted) {
    return (
      <GifWrapper>
        <Gif src={completedGif} />
      </GifWrapper>
    );
  }

  if (
    patientsLoading ||
    dentistLoading ||
    treatmentsLoading ||
    loadingCreateAppointment
  ) {
    return (
      <GifWrapper>
        <Gif src={loadingGif} />
      </GifWrapper>
    );
  }

  return (
    <>
      <ModalTitle>New Appointment</ModalTitle>
      <form id='newAppointmentForm' onSubmit={handleSubmit}>
        {!isNewPatient && (
          <SelectWithInput
            label='patient'
            fieldName='patientId'
            readFrom='id'
            displayValue='nameWithSurname'
            isError={errors.includes('patient')}
            errorMsg='Please select patient'
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
          isError={errors.includes('treatment')}
          errorMsg='Please select treatment'
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
          isError={errors.includes('dentist')}
          errorMsg='Please select dentist'
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
            isError={errors.includes('startAt')}
            errorMsg='Please select time'
            displayValue='formatedDate'
            placeholder='Select time'
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
        <Button primary type='submit' form='newAppointmentForm'>
          Confirm
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default NewAppointmentContent;
