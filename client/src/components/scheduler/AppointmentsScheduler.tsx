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
  DragDropProvider,
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AppointmentCell,
  AppointmentContent,
  DraftAppointment,
  DragContainer,
  RootContainer,
  SourceAppointment,
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
  APPOINTMENTS_DELETE_SUB,
  APPOINTMENTS_SUBSCRIPTION,
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from '../../graphql/queries/appointments';
import {
  DeleteAppointment,
  DeleteAppointmentVariables,
} from '../../graphql/queries/__generated__/DeleteAppointment';
import {
  CreateAppointment,
  CreateAppointmentVariables,
} from '../../graphql/queries/__generated__/CreateAppointment';
import { AppointmentsSubscription } from '../../graphql/queries/__generated__/AppointmentsSubscription';
import {
  UpdateAppointment,
  UpdateAppointmentVariables,
} from '../../graphql/queries/__generated__/UpdateAppointment';
import { AppointmentsDeleteSub } from '../../graphql/queries/__generated__/AppointmentsDeleteSub';

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

type SubscriptionData = {
  data: AppointmentsSubscription;
};

type SubscriptionDelete = {
  data: AppointmentsDeleteSub;
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

  const { data: appointmnetsData, loading, subscribeToMore } = useQuery<
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
    fetchPolicy: 'network-only',
  });

  // subscription for appointment delete
  useEffect(() => {
    let unsubscribe = subscribeToMore({
      document: APPOINTMENTS_DELETE_SUB,
      variables: { clinicId },
      updateQuery: (
        prev,
        { subscriptionData }: { subscriptionData: SubscriptionDelete }
      ) => {
        if (!subscriptionData.data) return prev;

        const response = subscriptionData.data.appointmentsDeleteSub;

        const filtered = prev.clinicAppointments.filter(
          (item) => item.id !== response.content.id
        );

        const newCache = Object.assign({}, prev, {
          clinicAppointments: [...filtered],
        });

        return newCache;
      },
    });
    return () => unsubscribe();
  }, [clinicId, subscribeToMore]);

  // subscription for new and updated appointments
  useEffect(() => {
    let unsubscribe = subscribeToMore({
      document: APPOINTMENTS_SUBSCRIPTION,
      variables: { clinicId },
      updateQuery: (
        prev,
        { subscriptionData }: { subscriptionData: SubscriptionData } // I don't like this typing but let it be for now
      ) => {
        if (!subscriptionData.data) return prev;

        const response = subscriptionData.data.appointmentsSubscription;

        if (response.mutation === 'ADDED') {
          const newCache = Object.assign({}, prev, {
            clinicAppointments: [...prev.clinicAppointments, response.content],
          });

          return newCache;
        }
        if (response.mutation === 'UPDATED') {
          const filtered = prev.clinicAppointments.filter(
            (item) => item.id !== response.content.id
          );

          const newCache = Object.assign({}, prev, {
            clinicAppointments: [...filtered, response.content],
          });

          return newCache;
        }

        return prev;
      },
    });
    return () => unsubscribe();
  }, [clinicId, subscribeToMore]);

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

  const [updateAppointment] = useMutation<
    UpdateAppointment,
    UpdateAppointmentVariables
  >(UPDATE_APPOINTMENT);

  const commitChanges = ({ added, changed, deleted }: any) => {
    if (added) {
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
    // I'm not a fan of this "changed" object, it requires a lot of unnecessery manipulation
    if (changed) {
      const idKey = Object.keys(changed)[0];
      if (changed[idKey].startDate) {
        changed[idKey].startAt = changed[idKey].startDate;
        delete changed[idKey].startDate;
      }
      if (changed[idKey].endDate) {
        changed[idKey].endAt = changed[idKey].endDate;
        delete changed[idKey].endDate;
      }

      updateAppointment({
        variables: {
          id: idKey,
          appointmentData: {
            ...changed[parseInt(idKey)],
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
          <DragDropProvider
            allowResize={() => false}
            sourceAppointmentComponent={SourceAppointment}
            draftAppointmentComponent={DraftAppointment}
            containerComponent={DragContainer}
            resizeComponent={() => null}
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
