/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDentistsGrouping
// ====================================================

export interface GetDentistsGrouping_clinicDentists {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
  text: string | null;
}

export interface GetDentistsGrouping {
  clinicDentists: GetDentistsGrouping_clinicDentists[] | null;
}

export interface GetDentistsGroupingVariables {
  clinicId: string;
}
