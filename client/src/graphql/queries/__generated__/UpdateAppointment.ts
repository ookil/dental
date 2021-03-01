/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateAppointmentInput, AppointmentStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateAppointment
// ====================================================

export interface UpdateAppointment_updateAppointment_patient {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  nameWithSurname: string | null;
}

export interface UpdateAppointment_updateAppointment {
  __typename: "Appointment";
  id: string;
  treatment: string;
  startDate: any;
  endDate: any;
  status: AppointmentStatus;
  patient: UpdateAppointment_updateAppointment_patient;
  dentistId: string;
}

export interface UpdateAppointment {
  updateAppointment: UpdateAppointment_updateAppointment;
}

export interface UpdateAppointmentVariables {
  appointmentData: UpdateAppointmentInput;
  id: string;
}
