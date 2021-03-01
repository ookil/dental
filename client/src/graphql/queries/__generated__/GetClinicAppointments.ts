/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAppointmentsInput, AppointmentStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetClinicAppointments
// ====================================================

export interface GetClinicAppointments_clinicAppointments_patient {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  nameWithSurname: string | null;
}

export interface GetClinicAppointments_clinicAppointments {
  __typename: "Appointment";
  id: string;
  treatment: string;
  startDate: any;
  endDate: any;
  status: AppointmentStatus;
  patient: GetClinicAppointments_clinicAppointments_patient;
  dentistId: string;
}

export interface GetClinicAppointments {
  clinicAppointments: GetClinicAppointments_clinicAppointments[];
}

export interface GetClinicAppointmentsVariables {
  appointmentsData: GetAppointmentsInput;
}
