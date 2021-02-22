/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDentistsQuery
// ====================================================

export interface GetDentistsQuery_clinicDentists {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
  active: boolean;
  nameWithSurname: string | null;
}

export interface GetDentistsQuery {
  clinicDentists: GetDentistsQuery_clinicDentists[] | null;
}

export interface GetDentistsQueryVariables {
  clinicId: string;
}
