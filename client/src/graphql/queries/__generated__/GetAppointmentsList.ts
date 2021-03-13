/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentsListInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetAppointmentsList
// ====================================================

export interface GetAppointmentsList_appointmentsList {
  __typename: "AppointmentsList";
  startAt: any;
  endAt: any;
  working: boolean;
  busy: boolean;
}

export interface GetAppointmentsList {
  appointmentsList: GetAppointmentsList_appointmentsList[];
}

export interface GetAppointmentsListVariables {
  searchData: AppointmentsListInput;
}
