import { gql } from '@apollo/client';

export type WeeklyAppointments = {
  date: Date;
  appointments: Date[];
};

export type WeeklyAppointmentsData = {
  weeklyAppointments: WeeklyAppointments[];
};

type ClinicAppointmentsOptions = {
  workStartHour?: number;
  workStartMinutes?: number;
  workEndHour?: number;
  workEndMinutes?: number;
  workOnSaturday?: boolean;
  workOnSunday?: boolean;
  appointmentDuration?: number;
};

export type WeeklyAppointmentsInput = {
  days: Date[];
  clinicId: string | number;
  dentistId: string | number;
  options?: ClinicAppointmentsOptions;
};

export type WeeklyAppointmentsVars = {
  appointmentsInput: WeeklyAppointmentsInput;
};

export const GET_WEEKLY_APPOINTMENTS = gql`
  query GetWeeklyAppointmentsQuery(
    $appointmentsInput: WeeklyAppointmentsInput!
  ) {
    weeklyAppointments(weeklyAppointmentsData: $appointmentsInput) {
      date
      appointments
    }
  }
`;
