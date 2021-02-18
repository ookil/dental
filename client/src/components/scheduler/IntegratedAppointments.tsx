import { Plugin, Getter } from '@devexpress/dx-react-core';
import { compareAsc, isSameDay } from 'date-fns';
import { Appointment } from '../../graphql/queries/appointments';

// this plugin is created in order to make month view more readable and useful.
// by deafault appointments will get squished inside cell if there is too much
// I want to display some informations in cells that do have at least one appointment happening that day
// as I dont want to change how appointments are mapped inside time tables I had to rewrite data thats used to display them

// timeTableAppointments is an array(arr1) where element is another array(arr2) consisting of all appointments by grouping - dentist in my case
// so I'm grouping appointments that happen on the same day and change arr2 to have only one element per day (this will be used to display information in the right cell)
// and overriting dataItem to insead hold array of all appointmens

// i know, that's a lot of nested arrays...

const pluginDependencies = [
  { name: 'MonthView' },
  { name: 'IntegratedGrouping' },
];

type GettersProps = {
  [getterName: string]: any;
};

type TimeTableAppointmentProps = {
  dataItem: Appointment;
  dentistId: string;
  start: any;
  end: any;
  resources: any[];
  key: Date;
};

const sortAppointments = (
  timeTableAppointments: TimeTableAppointmentProps[]
) => {
  return timeTableAppointments
    .slice()
    .sort((a, b) => compareAsc(a.dataItem.startDate, b.dataItem.startDate));
};

const groupBySameDay = (appointments: TimeTableAppointmentProps[]) => {
  if (appointments.length === 1)
    return [{ ...appointments[0], dataItem: [appointments[0].dataItem] }];

  if (appointments.length > 1) {
    let results = [];
    let currentDay = appointments[0];
    let day = { ...appointments[0], dataItem: [appointments[0].dataItem] };
    for (let index = 1; index < appointments.length; index++) {
      if (
        isSameDay(
          currentDay.dataItem.startDate,
          appointments[index].dataItem.startDate
        )
      ) {
        day.dataItem = [...day.dataItem, appointments[index].dataItem];
        if (index === appointments.length - 1) results.push(day);
      } else {
        results.push(day);
        currentDay = appointments[index];
        day = {
          ...appointments[index],
          dataItem: [appointments[index].dataItem],
        };
      }
    }

    return results;
  } else {
    return appointments;
  }
};

const sliceAppointments = ({
  currentView,
  timeTableAppointments,
}: GettersProps) => {
  if (currentView.type !== 'month') return timeTableAppointments;

  const sortedAppointments = timeTableAppointments.map(sortAppointments);
  const groupedAppointments = sortedAppointments.map(groupBySameDay);

  return groupedAppointments;
};

export const IntegratedAppointments = () => {
  return (
    <Plugin name='IntegratedAppointments' dependencies={pluginDependencies}>
      <Getter name='timeTableAppointments' computed={sliceAppointments} />
    </Plugin>
  );
};
