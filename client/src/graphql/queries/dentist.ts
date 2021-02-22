import { gql } from '@apollo/client';

export type ClinicDentist = {
  id: number | string;
  name: string;
  surname: string;
  active: boolean;
};

export type ClinicDentistsData = {
  clinicDentists: ClinicDentist[];
};

export type ClinicDentistVar = {
  clinicId: number | string;
};

export const GET_CLINIC_DENTISTS = gql`
  query GetDentistsQuery($clinicId: ID!) {
    clinicDentists(id: $clinicId) {
      id
      name
      surname
      active
      nameWithSurname @client
    }
  }
`;

export const GET_DENTIST = gql`
  query GetDentistQuery($dentistId: ID!) {
    dentist(id: $dentistId) {
      id
      name
      surname
      nameWithSurname @client
      active
      patients {
        name
      }
      appointments {
        treatment
      }
    }
  }
`;

export const DENTIST_GROUPING = gql`
  query GetDentistsGrouping($clinicId: ID!) {
    clinicDentists(id: $clinicId) {
      id
      name
      surname
      text: nameWithSurname @client
    }
  }
`;
