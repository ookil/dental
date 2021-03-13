import { gql } from '@apollo/client';

export const GET_WEEKLY_APPOINTMENTS = gql`
  query GetWeeklyAppointments($appointmentsInput: WeeklyAppointmentsInput!) {
    weeklyAppointments(weeklyAppointmentsData: $appointmentsInput) {
      date
      appointments
    }
  }
`;

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

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($appointmentId: ID!) {
    deleteAppointment(id: $appointmentId) {
      id
    }
  }
`;

export const APPOINTMENTS_DELETE_SUB = gql`
  subscription AppointmentsDeleteSub($clinicId: ID!) {
    appointmentsDeleteSub(clinicId: $clinicId) {
      mutation
      content {
        id
      }
    }
  }
`;

export const APPOINTMENTS_SUBSCRIPTION = gql`
  subscription AppointmentsSubscription($clinicId: ID!) {
    appointmentsSubscription(clinicId: $clinicId) {
      mutation
      content {
        id
        treatment
        startDate: startAt
        endDate: endAt
        status
        dentistId
        patient {
          id
          name
          surname
          nameWithSurname @client
        }
      }
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $appointmentData: UpdateAppointmentInput!
    $id: ID!
  ) {
    updateAppointment(appointmentData: $appointmentData, id: $id) {
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

export const GET_APPOINTMENTS_LIST = gql`
  query GetAppointmentsList($searchData: AppointmentsListInput!) {
    appointmentsList(searchData: $searchData) {
      startAt
      endAt
      working
      busy
    }
  }
`;
