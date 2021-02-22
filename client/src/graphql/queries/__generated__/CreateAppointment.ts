/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAppointmentInput, CreatePatientInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAppointment
// ====================================================

export interface CreateAppointment_createAppointment {
  __typename: "Appointment";
  id: string;
  startAt: any;
  endAt: any;
}

export interface CreateAppointment {
  createAppointment: CreateAppointment_createAppointment;
}

export interface CreateAppointmentVariables {
  appointmentData: CreateAppointmentInput;
  newPatientData?: CreatePatientInput | null;
}
