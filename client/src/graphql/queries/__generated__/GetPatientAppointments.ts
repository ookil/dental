/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPatientAppointments
// ====================================================

export interface GetPatientAppointments_patient_appointments_dentist {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
}

export interface GetPatientAppointments_patient_appointments {
  __typename: "Appointment";
  id: string;
  treatment: string;
  startAt: any;
  endAt: any;
  createdAt: any;
  status: AppointmentStatus;
  dentist: GetPatientAppointments_patient_appointments_dentist;
}

export interface GetPatientAppointments_patient {
  __typename: "Patient";
  id: string;
  appointments: GetPatientAppointments_patient_appointments[] | null;
}

export interface GetPatientAppointments {
  patient: GetPatientAppointments_patient | null;
}

export interface GetPatientAppointmentsVariables {
  patientId: string;
}
