/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePatientInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddPatientMutation
// ====================================================

export interface AddPatientMutation_createPatient {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  active: boolean;
}

export interface AddPatientMutation {
  createPatient: AddPatientMutation_createPatient;
}

export interface AddPatientMutationVariables {
  patientData: CreatePatientInput;
}
