import React, { useState } from 'react';
import {
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
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
  RootContainer,
  TooltipContent,
} from './AppointmentsScheduler.elements';
import { Appointment } from '../../graphql/queries/appointments';
import {
  DesktopViewSwitcher,
  ExternalViewSwitcher,
  FlexibleSpace,
  NavigationButtons,
  StyledTodayBtn,
  ToolbarWithLoading,
} from './SchedulerToolbar.elements';
import {
  Cell,
  DayScaleLayout,
  DayScaleLayoutWeek,
  DayScaleRow,
  TimeScaleLabel,
  TimeScaleLayout,
  TimeTableLayout,
  TimeTableLayoutWeek,
} from './SchedulerViews.elements';
import { GroupCell } from './GroupingPanel';
import { IntegratedAppointments } from './IntegratedAppointments';
import { filterByDentist } from './utils/helpers';
import { TimeIndicator } from './TimeIndicator';

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
  {
    id: 5,
    startDate: new Date('2021-02-12T13:00'),
    endDate: new Date('2021-02-12T13:30'),
    patient: {
      id: 1,
      name: 'Wiola',
      surname: 'Kowalska',
    },
    treatment: 'Root Canal',
    dentistId: '1',
    status: 'CONFIRMED',
    clinicId: '7',
  },
  {
    id: 6,
    startDate: new Date('2021-02-12T13:30'),
    endDate: new Date('2021-02-12T14:00'),
    patient: {
      id: 1,
      name: 'Wiola',
      surname: 'Kowalska',
    },
    treatment: 'Root Canal',
    dentistId: '1',
    status: 'CONFIRMED',
    clinicId: '7',
  },
  {
    id: 7,
    startDate: new Date('2021-02-12T15:00'),
    endDate: new Date('2021-02-12T15:30'),
    patient: {
      id: 1,
      name: 'Wiola',
      surname: 'Kowalska',
    },
    treatment: 'Root Canal',
    dentistId: '1',
    status: 'REGISTERED',
    clinicId: '7',
  },
  {
    id: 8,
    startDate: new Date('2021-02-12T16:00'),
    endDate: new Date('2021-02-12T16:30'),
    patient: {
      id: 1,
      name: 'Wiola',
      surname: 'Kowalska',
    },
    treatment: 'Root Canal',
    dentistId: '1',
    status: 'REGISTERED',
    clinicId: '7',
  },
  {
    id: 9,
    startDate: new Date('2021-02-12T08:00'),
    endDate: new Date('2021-02-12T08:30'),
    patient: {
      id: 1,
      name: 'Wiola',
      surname: 'Kowalska',
    },
    treatment: 'Root Canal',
    dentistId: '1',
    status: 'CONFIRMED',
    clinicId: '7',
  },
];

const workStartHour = 14;
const workEndHour = 23;
const appointmentDuration = 30;
const loading = false;

const AppointmentsScheduler: React.FC = () => {
  const [currentDentistId, setCurrentDentistId] = useState<string>('-1'); //default all dentists
  const [currentView, setCurrentView] = useState<string>('Day');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

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

  const handleClick = (startDate: Date) => {
    setCurrentDate(startDate);
    setCurrentView('Day');
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
            currentDate={currentDate}
            onCurrentDateChange={(date) => setCurrentDate(date)}
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
            dayScaleLayoutComponent={(props) => (
              <DayScaleLayout
                {...props}
                isOneDentistView={currentDentistId !== '-1' ? true : false}
              />
            )}
            timeTableLayoutComponent={(props) => (
              <TimeTableLayout
                {...props}
                isOneDentistView={currentDentistId !== '-1' ? true : false}
              />
            )}
          />
          <WeekView
            startDayHour={workStartHour}
            endDayHour={workEndHour}
            cellDuration={appointmentDuration}
            excludedDays={[0, 6]}
            timeScaleLabelComponent={TimeScaleLabel}
            timeScaleLayoutComponent={TimeScaleLayout}
            layoutComponent={DayScaleRow}
            dayScaleLayoutComponent={(props) => (
              <DayScaleLayoutWeek
                {...props}
                isOneDentistView={currentDentistId !== '-1' ? true : false}
              />
            )}
            timeTableLayoutComponent={(props) => (
              <TimeTableLayoutWeek
                {...props}
                isOneDentistView={currentDentistId !== '-1' ? true : false}
              />
            )}
          />
          <MonthView
            timeTableCellComponent={(props) => (
              <Cell {...props} handleClick={handleClick} />
            )}
          />
          <Appointments
            appointmentComponent={(props) => (
              <AppointmentCell
                {...props}
                viewName={currentView}
                handleClick={handleClick}
              />
            )}
            appointmentContentComponent={(props) => (
              <AppointmentContent {...props} viewName={currentView} />
            )}
          />

          <Resources data={resources} />

          <IntegratedGrouping />
          <IntegratedEditing />
          <IntegratedAppointments />

          <GroupingPanel cellComponent={GroupCell} />

          <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
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

          <CurrentTimeIndicator
            shadePreviousCells={true}
            shadePreviousAppointments={true}
            indicatorComponent={TimeIndicator}
          />
        </Scheduler>
      </RootContainer>
    </>
  );
};

export default AppointmentsScheduler;
