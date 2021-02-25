import React, { useEffect, useState } from 'react';
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
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
  GetClinicAppointments_clinicAppointments,
} from '../../graphql/queries/__generated__/GetClinicAppointments';
import { useMutation, useQuery } from '@apollo/client';
import { GET_APPOINTMENTS } from '../../graphql/queries/clinic';
import { clinicIdVar } from '../../cache';
import { BasicLayout } from './AppointmentForm';
import {
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from '../../graphql/queries/appointments';
import {
  DeleteAppointment,
  DeleteAppointmentVariables,
} from '../../graphql/queries/__generated__/DeleteAppointment';
import {
  CreateAppointment,
  CreateAppointmentVariables,
} from '../../graphql/queries/__generated__/CreateAppointment';

const grouping = [
  {
    resourceName: 'dentistId',
  },
];

const workStartHour = 8;
const workEndHour = 18;
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
    skip: daysRange === undefined,
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

  const [deleteAppointment] = useMutation<
    DeleteAppointment,
    DeleteAppointmentVariables
  >(DELETE_APPOINTMENT);

  const [createAppointment] = useMutation<
    CreateAppointment,
    CreateAppointmentVariables
  >(CREATE_APPOINTMENT);

  const commitChanges = ({ added, changed, deleted }: any) => {
    if (added) {
      console.log(added);
      createAppointment({
        variables: {
          appointmentData: {
            clinicId,
            dentistId: added.dentistId,
            patientId: added.patientId,
            treatment: added.treatment,
            startAt: added.startDate,
            endAt: added.endDate,
            status: added.status,
          },
        },
      });
    }

    if (deleted) {
      deleteAppointment({
        variables: {
          appointmentId: deleted,
        },
      });
    }
  };

  return (
    <>
      <RootContainer>
        <ExternalViewSwitcher
          currentViewName={currentView}
          onViewChange={(e) => setCurrentView(e.currentTarget.value)}
        />
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
          <EditingState onCommitChanges={commitChanges} />
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
                data={props.data as GetClinicAppointments_clinicAppointments}
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
            showDeleteButton
          />

          <CurrentTimeIndicator
            shadePreviousCells={true}
            shadePreviousAppointments={true}
            indicatorComponent={TimeIndicator}
          />

          <AppointmentForm
            basicLayoutComponent={(props) => (
              <BasicLayout
                {...props}
                appointmentData={
                  props.appointmentData as GetClinicAppointments_clinicAppointments
                }
              />
            )}
            booleanEditorComponent={() => null}
            textEditorComponent={() => null}
            dateEditorComponent={() => null}
            labelComponent={() => null}
            resourceEditorComponent={() => null}
          />

          <ConfirmationDialog />
        </Scheduler>
      </RootContainer>
    </>
  );
};

export default AppointmentsScheduler;
