import { gql } from '@apollo/client';

export type ClinicPatient = {
  id: number | string;
  name: string;
  surname: string;
  active: boolean;
};

export type ClinicPatientData = {
  clinicPatients: ClinicPatient[];
};

export type ClinicPatientVar = {
  clinicId: number | string;
};

export const GET_CLINIC_PATIENTS = gql`
  query GetPatientsQuery($clinicId: ID!) {
    clinicPatients(id: $clinicId) {
      id
      surname
      name
      active
      nameWithSurname @client
    }
  }
`;

export type NewPatientDetails = {
  name: string;
  surname: string;
  email?: string | null;
  dentistId: number | null;
  clinicId: number | string;
};

export const ADD_PATIENT = gql`
  mutation AddPatientMutation($patientData: CreatePatientInput!) {
    createPatient(patientData: $patientData) {
      id
      name
      surname
      active
    }
  }
`;
