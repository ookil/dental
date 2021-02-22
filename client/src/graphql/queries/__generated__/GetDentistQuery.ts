/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDentistQuery
// ====================================================

export interface GetDentistQuery_dentist_patients {
  __typename: "Patient";
  name: string;
}

export interface GetDentistQuery_dentist_appointments {
  __typename: "Appointment";
  treatment: string;
}

export interface GetDentistQuery_dentist {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
  nameWithSurname: string | null;
  active: boolean;
  patients: GetDentistQuery_dentist_patients[] | null;
  appointments: GetDentistQuery_dentist_appointments[] | null;
}

export interface GetDentistQuery {
  dentist: GetDentistQuery_dentist | null;
}

export interface GetDentistQueryVariables {
  dentistId: string;
}
