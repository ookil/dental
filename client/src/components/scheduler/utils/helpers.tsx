import { Appointment } from '../../../graphql/queries/appointments';

export const filterByDentist = (
  appointments: Appointment[],
  dentistId: string
) => {
  if (dentistId === '-1') return appointments;
  return appointments.filter(
    (appointment) => !dentistId || appointment.dentistId === dentistId
  );
};


