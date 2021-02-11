import { AppointmentTooltip } from '@devexpress/dx-react-scheduler'; //Appointments
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';
import styled from 'styled-components';
import { color } from '../../globalStyles';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

const {
  textPrimary,
  lightGreen,
  greenConfirm,
  yellowUnknow,
  pinkCancel,
} = color;

type AppointmentProps = Appointments.AppointmentProps;
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
  background-color: ${({ status }) =>
    status === 'CONFIRMED' ? lightGreen : yellowUnknow} !important;
`;

export const AppointmentCell = ({
  data,
  onClick,
  ...restProps
}: AppointmentProps) => {
  return <StyledAppointment {...restProps} data={data} status={data.status} />;
};

/* interface StyledAppointment extends Appointments.AppointmentProps {
  status: 'REGISTERED' | 'CONFIRMED';
}

const StyledAppointment = styled.div<StyledAppointment>`
  width: 100%;
  border: 1px solid #fff;
  height: 100%;
  overflow: hidden;
  position: absolute;
  font-size: 0.75rem;
  box-sizing: border-box;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.66;
  user-select: none;
  border-radius: 4px;
  letter-spacing: 0.03333em;
  background-clip: padding-box;
  background-color: ${({ status }) =>
    status === 'CONFIRMED' ? lightGreen : yellowUnknow};
`; 

export const AppointmentCell = ({ data, ...restProps }: Appointments.AppointmentProps) => {
  return <StyledAppointment {...restProps} data={data} status={data.status} />;
};*/

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
