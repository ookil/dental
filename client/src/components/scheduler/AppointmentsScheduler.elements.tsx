import {
  AppointmentModel,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler'; //Appointments
import {
  Appointments,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';
import styled, { css } from 'styled-components';
import { color } from '../../globalStyles';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import React from 'react';

const {
  textPrimary,
  lightGreen,
  greenConfirm,
  yellowUnknow,
  pinkCancel,
} = color;

export const RootContainer = styled.div`
  height: calc(100% - 3px);
  width: 100%;
  background-color: #fff;

  div[class*='makeStyles-container-'] {
    height: 100%;
  }
`;

type AppointmentContentProps = Appointments.AppointmentContentProps & {
  viewName: string;
};

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
    background-color: ${({ status, isShaded }) =>
      status === 'CONFIRMED'
        ? isShaded
          ? '#85e48599'
          : '#85e485'
        : isShaded
        ? '#f0ea5699'
        : yellowUnknow};

    &:hover {
      background-color: ${({ status }) =>
        status === 'CONFIRMED' ? lightGreen : '#fff97b'};
    }
  }
`;

const StyledMonthAppointment = styled.div<{
  status: 'REGISTERED' | 'CONFIRMED';
  isShaded?: boolean;
}>`
  width: 100%;
  display: flex;
  padding-left: 0.9em;
  align-items: center;
  border: 1px solid #fff;
  height: 50%;
  overflow: hidden;
  position: absolute;
  font-size: 0.75rem;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.66;
  user-select: none;
  border-radius: 4px;
  letter-spacing: 0.03333em;
  background-clip: padding-box;
  cursor: pointer;
  background-color: ${({ status, isShaded }) =>
    status === 'CONFIRMED'
      ? isShaded
        ? '#85e48599'
        : '#85e485'
      : isShaded
      ? '#f0ea5699'
      : yellowUnknow};

  ${({ status }) =>
    status === 'REGISTERED' &&
    css`
      top: 50%;
    `}

  &:hover {
    background-color: ${({ status }) =>
      status === 'CONFIRMED' ? lightGreen : '#fff97b'};
  }
`;

const MonthAppointmentCell = ({
  data,
  onClick,
  isShaded,
}: {
  data: AppointmentModel[];
  onClick: () => void;
  isShaded?: boolean;
}) => {
  let registeredCount = 0;
  let confirmedCount = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].status === 'REGISTERED') {
      registeredCount++;
    }
    if (data[i].status === 'CONFIRMED') {
      confirmedCount++;
    }
  }

  return (
    <>
      {confirmedCount > 0 && (
        <StyledMonthAppointment
          status='CONFIRMED'
          onClick={onClick}
          isShaded={isShaded}
        >
          {confirmedCount} Confirmed
        </StyledMonthAppointment>
      )}
      {registeredCount > 0 && (
        <StyledMonthAppointment
          status='REGISTERED'
          onClick={onClick}
          isShaded={isShaded}
        >
          {registeredCount} Registered
        </StyledMonthAppointment>
      )}
    </>
  );
};

type AppointmentCellProps = Appointments.AppointmentProps & {
  viewName: string;
  handleClick: (startDate: any) => void;
};

export const AppointmentCell = ({
  data,
  viewName,
  isShaded,
  handleClick,
  ...restProps
}: AppointmentCellProps) => {
  if (viewName === 'Month') {
    return (
      <MonthAppointmentCell
        data={data.appointmentsList}
        onClick={() => handleClick(data.startDate)}
        isShaded={isShaded}
      />
    );
  }
  return (
    <StyledAppointment
      {...restProps}
      isShaded={isShaded}
      data={data}
      status={data.status}
    />
  );
};

export const AppointmentContent = ({
  data,
  viewName,
  ...restProps
}: AppointmentContentProps) => {
  if (viewName === 'Month') return null;
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
            {format(new Date(startDate), 'H:mm') +
              ' - ' +
              format(new Date(endDate), 'H:mm')}
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

/* const ItemWrapper = styled.div<{ mobile?: boolean }>`
  ${({ mobile }) => css`
    ${mobile &&
    css`
      @media screen and (max-width: 740px) {
        display: none;
      }
    `}
  `}
`;

const DentistSelectorItem = ({
  dentistName,
  mobile,
}: {
  dentistName?: string;
  mobile?: boolean;
}) => {
  const displayText = dentistName || 'All Dentists';
  return (
    <ItemWrapper mobile={mobile}>
      <Text>{displayText}</Text>
    </ItemWrapper>
  );
};

const IconWrapper = styled.div`
  height: 24px;
  color: ${textPrimary};

  @media screen and (min-width: 740px) {
    display: none;
  }
`;

const DentistIcon = () => (
  <IconWrapper>
    <PersonRoundedIcon />
  </IconWrapper>
);

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
          <>
            <DentistIcon />
            <DentistSelectorItem
              dentistName={currentDentist.text}
              mobile={true}
            />
          </>
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

const StyledToolbar = styled(Toolbar.Root)`
  && {
    background: red;
  }
`;

export const ToolbarRoot = (props: Toolbar.RootProps) => {
  return <StyledToolbar {...props} />;
}; */

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
