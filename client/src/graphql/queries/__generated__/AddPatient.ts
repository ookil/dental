/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePatientInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddPatient
// ====================================================

export interface AddPatient_createPatient {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  active: boolean;
}

export interface AddPatient {
  createPatient: AddPatient_createPatient;
}

export interface AddPatientVariables {
  patientData: CreatePatientInput;
}
