/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetClinic
// ====================================================

export interface GetClinic_clinic_settings {
  __typename: "ClinicSettings";
  clinicId: string;
  workOnSaturday: boolean;
  workOnSunday: boolean;
  workStartHour: number;
  workStartMinutes: number;
  workEndHour: number;
  workEndMinutes: number;
  appointmentDuration: number;
}

export interface GetClinic_clinic {
  __typename: "Clinic";
  id: string;
  settings: GetClinic_clinic_settings;
}

export interface GetClinic {
  clinic: GetClinic_clinic | null;
}

export interface GetClinicVariables {
  clinicId: string;
}
