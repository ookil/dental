import { useQuery } from '@apollo/client';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { clinicIdVar } from '../../../cache';
import { GET_CLINIC_PATIENTS } from '../../../graphql/queries/patient';
import { GET_TREATMENTS } from '../../../graphql/queries/treatment';
import { GetClinicAppointments_clinicAppointments } from '../../../graphql/queries/__generated__/GetClinicAppointments';
import {
  GetPatients,
  GetPatientsVariables,
} from '../../../graphql/queries/__generated__/GetPatients';
import {
  GetTreatments,
  GetTreatmentsVariables,
} from '../../../graphql/queries/__generated__/GetTreatments';
import Select from '../../elements/Select';
import SelectWithInput from '../../elements/SelectWithInput';
import { setPatients } from '../../../store/slices/modalsSlice';
import { useAppDispatch } from '../../../store/store';
import StatusToggler from '../../elements/StatusToggler';
import React, { useState } from 'react';
import {
  Box,
  LeftCol,
  ModalForm,
  RightCol,
  StyledDayPicker,
  StyledLayout,
  Wrapper,
} from './Form.elements';
import HoursList from './HoursList';
import { GET_APPOINTMENTS_LIST } from '../../../graphql/queries/appointments';
import {
  GetAppointmentsList,
  GetAppointmentsListVariables,
} from '../../../graphql/queries/__generated__/GetAppointmentsList';

export const Overlay = ({
  visible,
  children,
}: AppointmentForm.OverlayProps) => (
  <ModalForm isOpen={visible}>
    <Box>{children}</Box>
  </ModalForm>
);

interface Props extends AppointmentForm.BasicLayoutProps {
  appointmentData: GetClinicAppointments_clinicAppointments;
  currentDate: Date;
}

export const BasicLayout = ({
  appointmentData,
  onFieldChange,
  resources,
  appointmentResources,
  currentDate,
  ...restProps
}: Props) => {
  const clinicId = clinicIdVar();
  const [dentistId, setDentistId] = useState(appointmentResources[0].id);
  const [currentDay, setCurrentDay] = useState(currentDate);
  const handleDayClick = (day: Date) => {
    setCurrentDay(day);
  };

  const { data: treatmentsData } = useQuery<
    GetTreatments,
    GetTreatmentsVariables
  >(GET_TREATMENTS);

  const { data: patientData } = useQuery<GetPatients, GetPatientsVariables>(
    GET_CLINIC_PATIENTS,
    {
      variables: {
        clinicId,
      },
    }
  );

  const { data: timesData, loading } = useQuery<
    GetAppointmentsList,
    GetAppointmentsListVariables
  >(GET_APPOINTMENTS_LIST, {
    variables: {
      searchData: {
        clinicId,
        dentistId: `${dentistId}`,
        date: currentDay,
      },
    },
  });

  const dispatch = useAppDispatch();
  if (patientData?.clinicPatients)
    dispatch(setPatients(patientData.clinicPatients));

  const onCustomChange = (key: string, value: string | number) =>
    onFieldChange({ [key]: value });

  return (
    <StyledLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      resources={resources}
      appointmentResources={appointmentResources}
      {...restProps}
    >
      <SelectWithInput
        label='Patient'
        fieldName='patientId'
        readFrom='id'
        displayValue='nameWithSurname'
        options={patientData?.clinicPatients || []}
        initialValue={appointmentData?.patient?.nameWithSurname || ''}
        handleSelectChange={onCustomChange}
        sizing='big'
      />
      <Wrapper>
        <LeftCol>
          <Select
            label='Treatment'
            fieldName='treatment'
            readFrom='name'
            displayValue='name'
            options={treatmentsData?.treatments}
            initialValue={appointmentData.treatment}
            handleSelectChange={onCustomChange}
            sizing='big'
          />
          <Select
            label='Dentist'
            fieldName='dentistId'
            readFrom='id'
            displayValue='text'
            options={resources[0].instances}
            initialValue={appointmentResources[0].text}
            handleSelectChange={onCustomChange}
            sizing='big'
          />
          <StatusToggler
            label='Appointments Status'
            sizing='big'
            confirmText='Confirmed'
            registerText='Registered'
            showCancel={false}
            value={appointmentData.status || 'REGISTERED'}
            onToggleChange={(newStatus: string) =>
              onFieldChange({ status: newStatus })
            }
          />
          <StyledDayPicker
            firstDayOfWeek={1}
            selectedDays={currentDay}
            onDayClick={handleDayClick}
          />
        </LeftCol>
        <RightCol>
          {timesData?.appointmentsList && (
            <HoursList
              startDate={appointmentData.startDate}
              endDate={appointmentData.endDate}
              onFieldChange={onFieldChange}
              times={timesData.appointmentsList}
            />
          )}
        </RightCol>
      </Wrapper>
    </StyledLayout>
  );
};
