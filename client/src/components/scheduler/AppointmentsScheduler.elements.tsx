import { AppointmentTooltip } from '@devexpress/dx-react-scheduler'; //Appointments
import {
  Appointments,
  DateNavigator,
  TodayButton,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';
import styled from 'styled-components';
import { color } from '../../globalStyles';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const {
  textPrimary,
  lightGreen,
  greenConfirm,
  yellowUnknow,
  pinkCancel,
  bluePrimary,
} = color;

export const RootContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
`;

type AppointmentContentProps = Appointments.AppointmentContentProps;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.2em 0.2em;
  color: ${textPrimary};
`;

const PatientText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 1em;
`;

const TreatmentText = styled.div`
  font-style: italic;
`;

const StyledAppointment = styled(Appointments.Appointment)`
  // prioritaze styled-components rules over material-ui
  && {
    background-color: ${({ status }) =>
      status === 'CONFIRMED' ? lightGreen : yellowUnknow};

    &:hover {
      background-color: ${({ status }) =>
        status === 'CONFIRMED' ? '#7fdd7f' : '#fff97b'};
    }
  }
`;

export const AppointmentCell = ({
  data,
  ...restProps
}: Appointments.AppointmentProps) => {
  return <StyledAppointment {...restProps} data={data} status={data.status} />;
};

export const AppointmentContent = ({
  data,
  ...restProps
}: AppointmentContentProps) => {
  return (
    <Appointments.AppointmentContent {...restProps} data={data}>
      <Container>
        <PatientText>
          {data.patient.surname + ' ' + data.patient.name}
        </PatientText>
        <TreatmentText>{data.treatment}</TreatmentText>
      </Container>
    </Appointments.AppointmentContent>
  );
};

const ContentContainer = styled.div`
  padding: 12px 8px;
  font-size: 0.85rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.3;
  padding-top: 8px;
  background-color: #fff;
  color: ${textPrimary};
`;

const Row = styled.div<{ status?: string }>`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  color: ${({ status }) =>
    status === 'CONFIRMED'
      ? greenConfirm
      : status === 'REGISTERED'
      ? pinkCancel
      : 'inherit'};
`;

const ColLeft = styled.div`
  flex-basis: 15%;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const StatusCircle = styled.div<{ status: 'REGISTERED' | 'CONFIRMED' }>`
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === 'CONFIRMED' ? lightGreen : yellowUnknow};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.5em;
`;

const Text = styled.div``;

export const TooltipContent = ({
  appointmentData,
}: AppointmentTooltip.ContentProps) => {
  if (!appointmentData) return null;

  const { patient, status, startDate, endDate, treatment } = appointmentData;

  const Icon =
    status === 'CONFIRMED' ? (
      <CheckCircleOutlineRoundedIcon />
    ) : (
      <HelpOutlineRoundedIcon />
    );

  return (
    <ContentContainer>
      <Row>
        <ColLeft>
          <StatusCircle status={status} />
        </ColLeft>
        <Wrapper>
          <Title>{patient.name + ' ' + patient.surname}</Title>
          <Text>{treatment}</Text>
        </Wrapper>
      </Row>
      <Row>
        <ColLeft>
          <ScheduleRoundedIcon />
        </ColLeft>
        <Wrapper>
          <Text>{format(new Date(startDate), 'iiii, d MMM , y')}</Text>
          <Text>
            {format(new Date(startDate), 'h:mm') +
              ' - ' +
              format(new Date(endDate), 'h:mm')}
          </Text>
        </Wrapper>
      </Row>
      <Row status={status}>
        <ColLeft>{Icon}</ColLeft>
        <Text>
          {status === 'CONFIRMED'
            ? 'Appointment confirmed'
            : 'Appointment not confirmed'}
        </Text>
      </Row>
    </ContentContainer>
  );
};

const DentistSelectorItem = ({ dentistName }: { dentistName?: string }) => {
  const displayText = dentistName || 'All Dentists';
  return (
    <div>
      <Text>{displayText}</Text>
    </div>
  );
};

type DentistSelectorProps = {
  dentistId: string;
  dentists: any[];
  handleDentistChange: (dentistId: string) => void;
};

const DentistSelector: React.FC<DentistSelectorProps> = ({
  dentistId,
  dentists,
  handleDentistChange,
}) => {
  const currentDentist =
    dentistId === '-1'
      ? { text: 'All Dentists' }
      : dentists.find((dentist) => dentist.id === dentistId);

  return (
    <FormControl>
      <Select
        disableUnderline
        value={dentistId}
        onChange={(e) => {
          handleDentistChange(e.target.value as any);
        }}
        renderValue={() => (
          <DentistSelectorItem dentistName={currentDentist.text} />
        )}
      >
        <MenuItem value={'-1'}>
          <DentistSelectorItem />
        </MenuItem>
        {dentists.map(({ id, text }) => (
          <MenuItem value={id} key={id}>
            <DentistSelectorItem dentistName={text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const FlexibleSpace = ({
  dentistId,
  dentists,
  handleDentistChange,
  ...restProps
}: DentistSelectorProps) => {
  return (
    <Toolbar.FlexibleSpace {...restProps}>
      <DentistSelector
        dentistId={dentistId}
        dentists={dentists}
        handleDentistChange={handleDentistChange}
      />
    </Toolbar.FlexibleSpace>
  );
};

export const StyledToday = styled(TodayButton.Button)`
  && {
    border: 1px solid ${bluePrimary};
    border-radius: 10px;
    color: ${bluePrimary};

    &:hover {
      background-color: ${bluePrimary};
      color: #fff;
    }
  }
`;

export const StyledTodayBtn = (props: TodayButton.ButtonProps) => {
  return <StyledToday {...props} />;
};

const StyledToolbar = styled(Toolbar.Root)`
  && {
    background: red;
  }
`;

export const ToolbarRoot = (props: Toolbar.RootProps) => {
  return <StyledToolbar {...props} />;
};

export const RootNavigator = (props: DateNavigator.RootProps) => {
  return <DateNavigator.Root {...props} />;
};

export const CustomNavigatorChildren = (
  props: DateNavigator.NavigationButtonProps
) => {
  return (
    <>
      <DateNavigator.NavigationButton {...props} type={'back'} />

      <DateNavigator.NavigationButton type={'forward'} />
    </>
  );
};
