/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetScrollPatientsInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetScrollPatients
// ====================================================

export interface GetScrollPatients_getScrollPatients_patients {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
}

export interface GetScrollPatients_getScrollPatients {
  __typename: "PatientsConnection";
  hasMore: boolean;
  cursor: string | null;
  patients: GetScrollPatients_getScrollPatients_patients[];
}

export interface GetScrollPatients {
  getScrollPatients: GetScrollPatients_getScrollPatients;
}

export interface GetScrollPatientsVariables {
  patientsVar: GetScrollPatientsInput;
}
