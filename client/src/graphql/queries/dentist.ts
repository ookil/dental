import { gql } from '@apollo/client';

export type ClinicDentist = {
  id: number;
  name: string;
  surname: string;
  active: boolean;
};

export type ClinicDentistsData = {
  clinicDentists: ClinicDentist[];
};

export type ClinicDentistVar = {
  clinicId: number;
};

export const GET_CLINIC_DENTISTS = gql`
  query GetDentistsQuery($clinicId: Int!) {
    clinicDentists(id: $clinicId) {
      id
      name
      surname
      active
    }
  }
`;

export const GET_DENTIST = gql`
  query GetDentistQuery($dentistId: ID!) {
    dentist(id: $dentistId) {
      id
      name
      surname
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
