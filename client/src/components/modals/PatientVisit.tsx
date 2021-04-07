import { useMutation, useQuery } from '@apollo/client';
import { addMinutes } from 'date-fns';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CREATE_APPOINTMENT } from '../../graphql/queries/appointments';
import { GET_CLINIC_DENTISTS } from '../../graphql/queries/dentist';
import { GET_TREATMENTS } from '../../graphql/queries/treatment';
import {
  changeResponseModal,
  openModal,
  patientSelector,
  setAvailableAppointments,
} from '../../store/slices/modalsSlice';
import { useAppDispatch, RootState } from '../../store/store';
import CustomDayPicker from '../daypicker/CustomDayPicker';
import { Button, Gif, GifWrapper } from '../elements/Elements';
import Select from '../elements/Select';
import {
  ButtonsWrapper,
  InfoBox,
  ModalTitle,
  MoreOptionLink,
  ScrollBox,
} from './Modals.elements';
import loadingGif from '../../images/loading.gif';
import { GET_CLINIC } from '../../graphql/queries/clinic';
import { clinicIdVar } from '../../cache';
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
import Input from '../elements/Input';
import { SELECTED_PATIENT } from '../../graphql/queries/patient';
import {
  SelectedPatient,
  SelectedPatientVariables,
} from '../../graphql/queries/__generated__/SelectedPatient';

type Appointment = {
  patientId: string;
  dentistId: string;
  treatment: string;
  startAt: string;
  endAt: string;
};

const PatientVisit: React.FC = () => {
  const dispatch = useAppDispatch();

  /*   const [height, setHeight] = useState<number>();

  useEffect(() => {
    const windowHeight = window.screen.height;
    setHeight(windowHeight);
  }, []); */

  const { isNewPatient, patientId } = useSelector(patientSelector);

  const availableAppointments = useSelector(
    (state: RootState) => state.modal.availableAppointments
  );

  const clinicId = clinicIdVar();

  const { data: selectedPatient } = useQuery<
    SelectedPatient,
    SelectedPatientVariables
  >(SELECTED_PATIENT, {
    variables: {
      patientId,
    },
    skip: patientId === '' ? true : false,
  });

  const { data: clinicData } = useQuery<GetClinic, GetClinicVariables>(
    GET_CLINIC,
    {
      variables: {
        clinicId,
      },
    }
  );

  const duration = clinicData?.clinic?.settings.appointmentDuration;

  const [patientData, setPatientData] = useState({
    name: '',
    surname: '',
    mobile: '',
  });

  const [appointmentData, setAppointmentData] = useState<Appointment>({
    dentistId: '',
    patientId,
    startAt: '',
    endAt: '',
    treatment: '',
  });

  const { loading: dentistLoading, data: dentistQuery } = useQuery<
    GetDentists,
    GetDentistsVariables
  >(GET_CLINIC_DENTISTS, {
    variables: {
      clinicId,
    },
    skip: clinicId === undefined,
  });

  const dentists = dentistQuery?.clinicDentists || [];

  const { data: treatmentQuery, loading: treatmentsLoading } = useQuery<
    GetTreatments,
    GetTreatmentsVariables
  >(GET_TREATMENTS);

  const treatments = treatmentQuery && treatmentQuery.treatments;

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
    { loading: loadingCreateAppointment },
  ] = useMutation<CreateAppointment, CreateAppointmentVariables>(
    CREATE_APPOINTMENT,
    {
      onCompleted() {
        dispatch(
          changeResponseModal({
            status: 'CONFIRMATION',
            message: 'Patient successfully added.',
          })
        );
        dispatch(openModal(false));
        dispatch(setAvailableAppointments([]));
      },
      onError() {
        dispatch(
          changeResponseModal({
            status: 'ERROR',
            message: 'Something went wrong, please try again.',
          })
        );
      },
    }
  );

  if (appointmentData.startAt && duration)
    appointmentData.endAt = addMinutes(
      new Date(appointmentData.startAt),
      duration
    ).toISOString();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (appointmentData.dentistId === '') {
      dispatch(
        changeResponseModal({
          status: 'ERROR',
          message: 'Dentist not chosen.',
        })
      );
    }
    if (appointmentData.startAt === '') {
      dispatch(
        changeResponseModal({
          status: 'ERROR',
          message: 'Missing appointment hour.',
        })
      );
    }

    const isAppointmentData =
      appointmentData.dentistId &&
      appointmentData.endAt &&
      appointmentData.startAt &&
      appointmentData.treatment
        ? true
        : false;

    if (isNewPatient) {
      if (patientData.name === '' || patientData.surname === '') {
        dispatch(
          changeResponseModal({
            status: 'ERROR',
            message: 'Please provide patient name and surname.',
          })
        );
      }
      if (patientData.name && patientData.surname && isAppointmentData) {
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

  if (dentistLoading || treatmentsLoading || loadingCreateAppointment) {
    return (
      <GifWrapper>
        <Gif src={loadingGif} />
      </GifWrapper>
    );
  }

  return (
    <>
      <ModalTitle>New Appointment</ModalTitle>
      <ScrollBox>
        <form id='newAppointmentForm' onSubmit={handleSubmit}>
          <InfoBox label='Patient Information'>
            <Input
              label='name'
              name='name'
              type='text'
              minLength={3}
              maxLength={30}
              onChange={(e) => handlePatientChange(e)}
              layout='primary'
              readOnly={!isNewPatient}
              value={selectedPatient?.patient?.name}
            />
            <Input
              label='surname'
              name='surname'
              type='text'
              minLength={3}
              maxLength={30}
              onChange={(e) => handlePatientChange(e)}
              layout='primary'
              readOnly={!isNewPatient}
              value={selectedPatient?.patient?.surname}
            />
            <Input
              label='mobile'
              name='mobile'
              type='string'
              minLength={3}
              maxLength={30}
              onChange={(e) => handlePatientChange(e)}
              layout='primary'
              readOnly={!isNewPatient}
              value={selectedPatient?.patient?.mobile || ''}
            />
          </InfoBox>

          <InfoBox label='Appointment Information'>
            <Select
              label='treatment'
              fieldName='treatment'
              readFrom='name'
              displayValue='name'
              placeholder='Please select treatment'
              options={treatments}
              marginTop={0}
              handleSelectChange={handleSelectChange}
              layout='primary'
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
              layout='primary'
            />

            <CustomDayPicker dentistId={appointmentData.dentistId} />

            {availableAppointments.length > 0 && (
              <Select
                fieldName='startAt'
                readFrom='dateString'
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
          </InfoBox>
        </form>
      </ScrollBox>

      <ButtonsWrapper>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button primary type='submit' form='newAppointmentForm'>
          Confirm
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default PatientVisit;
