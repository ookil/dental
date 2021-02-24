import { useQuery } from '@apollo/client';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';
import { clinicIdVar } from '../../cache';
import { GET_CLINIC_PATIENTS } from '../../graphql/queries/patient';
import { GET_TREATMENTS } from '../../graphql/queries/treatment';
import { GetClinicAppointments_clinicAppointments } from '../../graphql/queries/__generated__/GetClinicAppointments';
import {
  GetPatients,
  GetPatientsVariables,
} from '../../graphql/queries/__generated__/GetPatients';
import {
  GetTreatments,
  GetTreatmentsVariables,
} from '../../graphql/queries/__generated__/GetTreatments';
import Select from '../elements/Select';
import SelectWithInput from '../elements/SelectWithInput';
import { color } from '../../globalStyles';
import { setPatients } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import StatusToggler from '../elements/StatusToggler';

const StyledOverlay = styled(AppointmentForm.Overlay)`
  && {
    z-index: 5;
    background-color: red;
  }
`;

const StyledLayout = styled(AppointmentForm.Layout)`
  && {
    z-index: 5;
    font-family: 'Montserrat', sans-serif;
    //background-color: #d3eef8;
  }
`;

export const FormOverlay = (props: AppointmentForm.OverlayProps) => (
  <StyledOverlay {...props} />
);

export const FormLayout = (props: AppointmentForm.LayoutProps) => (
  <StyledLayout {...props} />
);

const StyledDateEditor = styled(AppointmentForm.DateEditor)`
  && {
    div[class*='MuiInputBase-root'] {
      background-color: rgba(242, 241, 238, 0.6);

      &::before {
        border-bottom: 1px solid rgb(51 122 227 / 47%);
      }

      &::after {
        border-bottom: 1px solid ${color.bluePrimary};
      }
    }
  }
`;

const DateEditor = (props: AppointmentForm.DateEditorProps) => (
  <StyledDateEditor {...props} />
);

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface Props extends AppointmentForm.BasicLayoutProps {
  appointmentData: GetClinicAppointments_clinicAppointments;
}

export const BasicLayout = ({
  appointmentData,
  onFieldChange,
  resources,
  appointmentResources,
  ...restProps
}: Props) => {
  const clinicId = clinicIdVar();

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

  const dispatch = useAppDispatch();
  if (patientData?.clinicPatients)
    dispatch(setPatients(patientData.clinicPatients));

  const onCustomChange = (key: string, value: string | number) =>
    onFieldChange({ [key]: value });

  return (
    <AppointmentForm.BasicLayout
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
        handleSelectChange={() => console.log()}
        sizing='big'
      />

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

      <DateWrapper>
        <DateEditor
          locale='en-GB'
          value={appointmentData.startDate}
          onValueChange={(newDate) => {
            console.log(newDate);
            onFieldChange({ startDate: newDate });
          }}
        />
        -
        <DateEditor
          value={appointmentData.endDate}
          onValueChange={(newDate) => onFieldChange({ endDate: newDate })}
        />
      </DateWrapper>

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
        value={appointmentData.status}
        onToggleChange={(newStatus: string) => onFieldChange({ status: newStatus })}
      />
    </AppointmentForm.BasicLayout>
  );
};
