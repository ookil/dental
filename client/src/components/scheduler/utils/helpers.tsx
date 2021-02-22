import { GetClinicAppointments_clinicAppointments } from '../../../graphql/queries/__generated__/GetClinicAppointments';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const filterByDentist = (
  appointments: GetClinicAppointments_clinicAppointments[],
  dentistId: string
) => {
  if (dentistId === '-1') return appointments;
  return appointments.filter(
    (appointment) => !dentistId || appointment.dentistId === dentistId
  );
};

export const getDaysRange = (date: Date, currentView: string) => {
  if (currentView === 'Day') {
    const res = {
      firstDay: startOfDay(date),
      lastDay: endOfDay(date),
    };
    return res;
  }
  if (currentView === 'Week') {
    const res = {
      firstDay: startOfWeek(date, { weekStartsOn: 1 }),
      lastDay: endOfWeek(date, { weekStartsOn: 1 }),
    };
    return res;
  }
  if (currentView === 'Month') {
    const res = {
      firstDay: startOfMonth(date),
      lastDay: endOfMonth(date),
    };
    return res;
  }
};
