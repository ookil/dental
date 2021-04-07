/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SelectedPatient
// ====================================================

export interface SelectedPatient_patient {
  __typename: "Patient";
  id: string;
  surname: string;
  name: string;
  mobile: string | null;
}

export interface SelectedPatient {
  patient: SelectedPatient_patient | null;
}

export interface SelectedPatientVariables {
  patientId: string;
}
