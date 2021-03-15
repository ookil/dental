import { useMutation, useQuery } from '@apollo/client';
import { addMinutes } from 'date-fns';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CREATE_APPOINTMENT } from '../../graphql/queries/appointments';
import { GET_CLINIC_DENTISTS } from '../../graphql/queries/dentist';
import { GET_CLINIC_PATIENTS } from '../../graphql/queries/patient';
import { GET_TREATMENTS } from '../../graphql/queries/treatment';
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
import { GET_CLINIC } from '../../graphql/queries/clinic';
import { clinicIdVar } from '../../cache';
import {
  GetPatients,
  GetPatientsVariables,
} from '../../graphql/queries/__generated__/GetPatients';
import {
  GetClinic,
  GetClinicVariables,
} from '../../graphql/queries/__generated__/GetClinic';
import {
  GetDentists,
  GetDentistsVariables,
} from '../../graphql/queries/__generated__/GetDentists';
import {
  CreateAppointment,
  CreateAppointmentVariables,
} from '../../graphql/queries/__generated__/CreateAppointment';
import {
  GetTreatments,
  GetTreatmentsVariables,
} from '../../graphql/queries/__generated__/GetTreatments';

type Appointment = {
  patientId: string;
  dentistId: string;
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

  const { data: clinicData } = useQuery<GetClinic, GetClinicVariables>(
    GET_CLINIC,
    {
      variables: {
        clinicId,
      },
    }
  );

  const duration = clinicData?.clinic?.settings.appointmentDuration;

  const [isNewPatient, setNewPatient] = useState(false);
  const [patientData, setPatientData] = useState<Patient>({
    name: '',
    surname: '',
    nationalId: null,
    email: null,
    dentistId: '',
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
  } = useQuery<GetPatients, GetPatientsVariables>(GET_CLINIC_PATIENTS, {
    variables: {
      clinicId,
    },
    skip: clinicId === undefined,
  });

  const patients = (patientQuery && patientQuery.clinicPatients) || undefined;
  if (patients) dispatch(setPatients(patients));

  const {
    loading: dentistLoading,
    data: dentistQuery,
    error: dentistsError,
  } = useQuery<GetDentists, GetDentistsVariables>(GET_CLINIC_DENTISTS, {
    variables: {
      clinicId,
    },
    skip: clinicId === undefined,
  });

  const dentists = dentistQuery?.clinicDentists || [];

  const {
    data: treatmentQuery,
    loading: treatmentsLoading,
    error: treatmentsError,
  } = useQuery<GetTreatments, GetTreatmentsVariables>(GET_TREATMENTS);

  const treatments = treatmentQuery && treatmentQuery.treatments;

  const handleNewPatient = () => setNewPatient(!isNewPatient);

  //handles new patient inputs
  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  ] = useMutation<CreateAppointment, CreateAppointmentVariables>(
    CREATE_APPOINTMENT,
    {
      onCompleted() {
        setCompleted(true);
        setTimeout(() => {
          setCompleted(false);
          dispatch(openModal(false));
          dispatch(setAvailableAppointments([]));
        }, 2000);
      },
    }
  );

  if (appointmentData.startAt && duration)
    appointmentData.endAt = addMinutes(
      new Date(appointmentData.startAt),
      duration
    ).toISOString();

  const handleSubmit = (e: React.SyntheticEvent) => {
    setErrors([]);
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
      console.log('newPatient');
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
        console.log('create');
        createAppointment({
          variables: {
            appointmentData: { ...appointmentData, clinicId },
            newPatientData: { ...patientData, clinicId },
          },
        });
      }
    } else {
      if (appointmentData.patientId && isAppointmentData) {
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
            handleChange={handlePatientChange}
            handleSelectChange={(key: string, value: number | string) => {
              setPatientData((prevState) => ({
                ...prevState,
                [key]: value,
              }));
            }}
            options={dentists}
            errors={errors}
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
