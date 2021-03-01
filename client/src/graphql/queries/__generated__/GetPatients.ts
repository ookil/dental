/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatients
// ====================================================

export interface GetPatients_clinicPatients {
  [key: string]: any;
  __typename: "Patient";
  id: string;
  surname: string;
  name: string;
  active: boolean;
  nameWithSurname: string | null;
}

export interface GetPatients {
  clinicPatients: GetPatients_clinicPatients[] | null;
}

export interface GetPatientsVariables {
  clinicId: string;
}
