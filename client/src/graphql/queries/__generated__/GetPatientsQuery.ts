/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatientsQuery
// ====================================================

export interface GetPatientsQuery_clinicPatients {
  __typename: "Patient";
  id: string;
  surname: string;
  name: string;
  active: boolean;
  nameWithSurname: string | null;
}

export interface GetPatientsQuery {
  clinicPatients: GetPatientsQuery_clinicPatients[] | null;
}

export interface GetPatientsQueryVariables {
  clinicId: string;
}
