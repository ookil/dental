import React, { useState } from 'react';
import {
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  GroupingPanel,
  MonthView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AppointmentCell,
  AppointmentContent,
  FlexibleSpace,
  RootContainer,
  TooltipContent,
} from './AppointmentsScheduler.elements';
import { Appointment } from '../../graphql/queries/appointments';
import {
  DesktopViewSwitcher,
  ExternalViewSwitcher,
  NavigationButtons,
  StyledTodayBtn,
} from './SchedulerToolbar.elements';
import {
  DayScaleLayout,
  DayScaleLayoutWeek,
  DayScaleRow,
  TimeScaleLabel,
  TimeScaleLayout,
  TimeTableLayout,
  TimeTableLayoutWeek,
} from './SchedulerViews.elements';
import { GroupCell } from './GroupingPanel';

const appointments: Appointment[] = [
  {
    id: 1,
    startDate: new Date('2021-02-11T10:00'),
    endDate: new Date('2021-02-11T10:30'),
    patient: {
      id: 1,
      name: 'Zbigniew',
      surname: 'Kowalski',
    },
    treatment: 'Root Canal',
    dentistId: '1',
    status: 'REGISTERED',
    clinicId: '7',
  },
  {
    id: 2,
    startDate: new Date('2021-02-11T11:00'),
    endDate: new Date('2021-02-11T12:30'),
    patient: {
      id: 2,
      name: 'Aang',
      surname: 'Air',
    },
    treatment: 'Root Canal',
    dentistId: '2',
    status: 'CONFIRMED',
    clinicId: '7',
  },
  {
    id: 3,
    startDate: new Date('2021-02-11T11:00'),
    endDate: new Date('2021-02-11T11:30'),
    patient: {
      id: 1,
      name: 'Wiola',
      surname: 'Kowalska',
    },
    treatment: 'Root Canal',
    dentistId: '3',
    status: 'CONFIRMED',
    clinicId: '7',
  },
  {
    id: 4,
    startDate: new Date('2021-02-12T13:00'),
    endDate: new Date('2021-02-12T13:30'),
    patient: {
      id: 1,
      name: 'Wiola',
      surname: 'Kowalska',
    },
    treatment: 'Root Canal',
    dentistId: '4',
    status: 'CONFIRMED',
    clinicId: '7',
  },
];

const workStartHour = 8;
const workEndHour = 18;
const appointmentDuration = 30;

const filterByDentist = (appointments: Appointment[], dentistId: string) => {
  if (dentistId === '-1') return appointments;
  return appointments.filter(
    (appointment) => !dentistId || appointment.dentistId === dentistId
  );
};

const AppointmentsScheduler: React.FC = () => {
  const [currentDentistId, setCurrentDentistId] = useState<string>('-1'); //default all dentists
  const [currentView, setCurrentView] = useState<string>('Day');

  const dentists = [
    {
      id: '1',
      text: 'Doktor Ząbek',
    },
    {
      id: '2',
      text: 'Barabasz Cat',
    },
    {
      id: '3',
      text: 'Sylwia Cukier',
    },
    {
      id: '4',
      text: 'Grażyna Kowalczyk',
    },
    {
      id: '5',
      text: 'Roman Clue',
    },
  ];
  const [resources, setResources] = useState<any[]>([
    {
      fieldName: 'dentistId',
      title: 'Dentist',
      instances: dentists,
    },
  ]);

  const grouping = [
    {
      resourceName: 'dentistId',
    },
  ];

  const isDayOrWeek = (viewName: string) =>
    viewName === 'Day' || (viewName === 'Week' && currentDentistId === '-1');

  const handleDentistChange = (dentistId: string) => {
    setCurrentDentistId(dentistId);
    setResources([
      {
        ...resources[0],
        instances:
          dentistId === '-1'
            ? dentists
            : dentists.filter((dentist) => dentist.id === dentistId),
      },
    ]);
  };

  return (
    <>
      <ExternalViewSwitcher
        currentViewName={currentView}
        onViewChange={(e) => setCurrentView(e.target.value)}
      />

      <RootContainer>
        <Scheduler
          firstDayOfWeek={1}
          locale='en-GB'
          height={'auto'}
          data={filterByDentist(appointments, currentDentistId)}
        >
          <ViewState
            defaultCurrentDate={'2021-02-11T10:00'}
            currentViewName={currentView}
            onCurrentViewNameChange={(viewName) => setCurrentView(viewName)}
          />
          <EditingState onCommitChanges={() => console.log('change')} />
          <GroupingState grouping={grouping} groupByDate={isDayOrWeek} />
          <DayView
            startDayHour={workStartHour}
            endDayHour={workEndHour}
            cellDuration={appointmentDuration}
            timeScaleLabelComponent={TimeScaleLabel}
            timeScaleLayoutComponent={TimeScaleLayout}
            layoutComponent={DayScaleRow}
            dayScaleLayoutComponent={DayScaleLayout}
            timeTableLayoutComponent={TimeTableLayout}
          />
          <WeekView
            startDayHour={workStartHour}
            endDayHour={workEndHour}
            cellDuration={appointmentDuration}
            excludedDays={[0, 6]}
            timeScaleLabelComponent={TimeScaleLabel}
            timeScaleLayoutComponent={TimeScaleLayout}
            layoutComponent={DayScaleRow}
            dayScaleLayoutComponent={DayScaleLayoutWeek}
            timeTableLayoutComponent={TimeTableLayoutWeek}
          />
          <MonthView />
          <Appointments
            appointmentComponent={AppointmentCell}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources data={resources} />
          <IntegratedGrouping />
          <IntegratedEditing />
          <GroupingPanel cellComponent={GroupCell} />
          <Toolbar
            flexibleSpaceComponent={(props) => (
              <FlexibleSpace
                {...props}
                dentistId={currentDentistId}
                dentists={dentists}
                handleDentistChange={handleDentistChange}
              />
            )}
          />
          <DateNavigator navigationButtonComponent={NavigationButtons} />
          <TodayButton buttonComponent={StyledTodayBtn} />
          <ViewSwitcher switcherComponent={DesktopViewSwitcher} />
          <AppointmentTooltip
            contentComponent={TooltipContent}
            showOpenButton
            showCloseButton
          />
        </Scheduler>
      </RootContainer>
    </>
  );
};

export default AppointmentsScheduler;
