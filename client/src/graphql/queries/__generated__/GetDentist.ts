/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDentist
// ====================================================

export interface GetDentist_dentist_patients {
  __typename: "Patient";
  name: string;
}

export interface GetDentist_dentist_appointments {
  __typename: "Appointment";
  treatment: string;
}

export interface GetDentist_dentist {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
  nameWithSurname: string | null;
  active: boolean;
  patients: GetDentist_dentist_patients[] | null;
  appointments: GetDentist_dentist_appointments[] | null;
}

export interface GetDentist {
  dentist: GetDentist_dentist | null;
}

export interface GetDentistVariables {
  dentistId: string;
}
