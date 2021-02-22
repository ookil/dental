import React, { useEffect, useState } from 'react';
import {
  AppointmentForm,
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
import { filterByDentist, getDaysRange } from './utils/helpers';
import { TimeIndicator } from './TimeIndicator';
import { GetDentistsGrouping_clinicDentists } from '../../graphql/queries/__generated__/GetDentistsGrouping';
import {
  GetClinicAppointments,
  GetClinicAppointmentsVariables,
} from '../../graphql/queries/__generated__/GetClinicAppointments';
import { useQuery } from '@apollo/client';
import { GET_APPOINTMENTS } from '../../graphql/queries/clinic';
import { clinicIdVar } from '../../cache';
import { FormLayout, FormOverlay } from './AppointmentForm';

const grouping = [
  {
    resourceName: 'dentistId',
  },
];

const workStartHour = 14;
const workEndHour = 23;
const appointmentDuration = 30;

type SchedulerProps = {
  dentists: GetDentistsGrouping_clinicDentists[];
};

const AppointmentsScheduler = ({ dentists }: SchedulerProps) => {
  const clinicId = clinicIdVar();
  const [currentDentistId, setCurrentDentistId] = useState<string>('-1'); //default all dentists
  const [currentView, setCurrentView] = useState<string>('Day');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [daysRange, setDaysRange] = useState<{
    firstDay: Date;
    lastDay: Date;
  }>();

  const { data: appointmnetsData, loading } = useQuery<
    GetClinicAppointments,
    GetClinicAppointmentsVariables
  >(GET_APPOINTMENTS, {
    variables: {
      appointmentsData: {
        clinicId,
        firstDay: daysRange?.firstDay,
        lastDay: daysRange?.lastDay,
      },
    },
  });

  useEffect(() => {
    setDaysRange(getDaysRange(currentDate, currentView));
  }, [currentDate, currentView]);

  const appointments = appointmnetsData?.clinicAppointments || [];

  const [resources, setResources] = useState<any[]>([
    {
      fieldName: 'dentistId',
      title: 'Dentist',
      instances: dentists,
    },
  ]);

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

          <AppointmentForm
            overlayComponent={FormOverlay}
            layoutComponent={FormLayout}
          />
        </Scheduler>
      </RootContainer>
    </>
  );
};

export default AppointmentsScheduler;
