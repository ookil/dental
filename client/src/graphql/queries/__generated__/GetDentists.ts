/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDentists
// ====================================================

export interface GetDentists_clinicDentists {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
  active: boolean;
  nameWithSurname: string | null;
}

export interface GetDentists {
  clinicDentists: GetDentists_clinicDentists[] | null;
}

export interface GetDentistsVariables {
  clinicId: string;
}
