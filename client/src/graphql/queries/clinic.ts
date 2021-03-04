import { gql } from '@apollo/client';


export const CLINIC_SETTINGS_DATA = gql`
  fragment SettingsData on ClinicSettings {
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


export const GET_CLINIC = gql`
  query GetClinic($clinicId: ID!) {
    clinic(id: $clinicId) {
      id
      settings {
        ...SettingsData
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
        nameWithSurname @client
      }
      dentistId
    }
  }
`;
