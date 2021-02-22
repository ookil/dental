import { gql } from '@apollo/client';

export type SettingsData = {
  workOnSaturday: boolean;
  workOnSunday: boolean;
  workStartHour: number;
  workStartMinutes: number;
  workEndHour: number;
  workEndMinutes: number;
  appointmentDuration: number;
};

export const CLINIC_SETTINGS_DATA = gql`
  fragment settingsData on ClinicSettings {
    clinicId
    workOnSaturday
    workOnSunday
    workStartHour
    workStartMinutes
    workEndHour
    workEndMinutes
    appointmentDuration
  }
`;

type Clinic = {
  id: string;
  settings: SettingsData;
};

export type ClinicData = {
  clinic: Clinic;
};

export type ClinicVar = {
  clinicId: string | number;
};

export const GET_CLINIC = gql`
  query GetClinic($clinicId: ID!) {
    clinic(id: $clinicId) {
      id
      settings {
        ...settingsData
      }
    }
  }
  ${CLINIC_SETTINGS_DATA}
`;

export const GET_APPOINTMENTS = gql`
  query GetClinicAppointments($appointmentsData: GetAppointmentsInput!) {
    clinicAppointments(appointmentsData: $appointmentsData) {
      id
      treatment
      startDate: startAt
      endDate: endAt
      status
      patient {
        id
        name
        surname
      }
      dentistId
    }
  }
`;
