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

export type CreateAppointmentInput = {
  treatment: string;
  startAt: string;
  endAt: string;
  patientId: string | number;
  dentistId: string | number;
  clinicId: string;
};

export type CreateAppointment = {
  id: string;
  startAt: Date;
  endAt: Date;
};

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $appointmentData: CreateAppointmentInput!
    $newPatientData: CreatePatientInput
  ) {
    createAppointment(
      appointmentData: $appointmentData
      newPatientData: $newPatientData
    ) {
      id
      startAt
      endAt
    }
  }
`;
