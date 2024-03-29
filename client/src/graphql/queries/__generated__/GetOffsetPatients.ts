/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPatientsInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetOffsetPatients
// ====================================================

export interface GetOffsetPatients_getOffsetPatients_patients_appointments {
  __typename: "Appointment";
  id: string;
  endAt: any;
}

export interface GetOffsetPatients_getOffsetPatients_patients {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  bday: any | null;
  mobile: string | null;
  appointments: GetOffsetPatients_getOffsetPatients_patients_appointments[] | null;
}

export interface GetOffsetPatients_getOffsetPatients {
  __typename: "PatientsList";
  patients: GetOffsetPatients_getOffsetPatients_patients[];
  totalCount: number;
}

export interface GetOffsetPatients {
  getOffsetPatients: GetOffsetPatients_getOffsetPatients;
}

export interface GetOffsetPatientsVariables {
  patientsVar: GetPatientsInput;
}
