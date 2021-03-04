/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeeklyAppointmentsInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetWeeklyAppointments
// ====================================================

export interface GetWeeklyAppointments_weeklyAppointments {
  __typename: "WeeklyAppointments";
  date: any;
  appointments: any[];
}

export interface GetWeeklyAppointments {
  weeklyAppointments: GetWeeklyAppointments_weeklyAppointments[];
}

export interface GetWeeklyAppointmentsVariables {
  appointmentsInput: WeeklyAppointmentsInput;
}
