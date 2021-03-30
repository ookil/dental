import { gql } from '@apollo/client';

export const GET_CLINIC_PATIENTS = gql`
  query GetPatients($clinicId: ID!) {
    clinicPatients(id: $clinicId) {
      id
      surname
      name
      active
      nameWithSurname @client
    }
  }
`;

export const ADD_PATIENT = gql`
  mutation AddPatient($patientData: CreatePatientInput!) {
    createPatient(patientData: $patientData) {
      id
      name
      surname
      active
    }
  }
`;

export const GET_OFFSET_PATIENTS = gql`
  query GetOffsetPatients($patientsVar: GetPatientsInput!) {
    getOffsetPatients(patientsVar: $patientsVar) {
      patients {
        id
        name
        surname
        bday
        mobile
        appointments {
          id
          endAt
        }
      }
      totalCount
    }
  }
`;

export const GET_SCROLL_PATIENTS = gql`
  query GetScrollPatients($patientsVar: GetScrollPatientsInput!) {
    getScrollPatients(patientsVar: $patientsVar) {
      hasMore
      cursor
      patients {
        id
        name
        surname
      }
    }
  }
`;
