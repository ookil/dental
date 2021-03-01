/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: AppointmentsSubscription
// ====================================================

export interface AppointmentsSubscription_appointmentsSubscription_content_patient {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  nameWithSurname: string | null;
}

export interface AppointmentsSubscription_appointmentsSubscription_content {
  __typename: "Appointment";
  id: string;
  treatment: string;
  startDate: any;
  endDate: any;
  status: AppointmentStatus;
  dentistId: string;
  patient: AppointmentsSubscription_appointmentsSubscription_content_patient;
}

export interface AppointmentsSubscription_appointmentsSubscription {
  __typename: "AppointmentSubscription";
  mutation: string;
  content: AppointmentsSubscription_appointmentsSubscription_content;
}

export interface AppointmentsSubscription {
  appointmentsSubscription: AppointmentsSubscription_appointmentsSubscription;
}

export interface AppointmentsSubscriptionVariables {
  clinicId: string;
}
