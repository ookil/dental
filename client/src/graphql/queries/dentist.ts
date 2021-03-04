import { gql } from '@apollo/client';


export const GET_CLINIC_DENTISTS = gql`
  query GetDentists($clinicId: ID!) {
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
  query GetDentist($dentistId: ID!) {
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
