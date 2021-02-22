/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeeklyAppointmentsInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetWeeklyAppointmentsQuery
// ====================================================

export interface GetWeeklyAppointmentsQuery_weeklyAppointments {
  __typename: "WeeklyAppointments";
  date: any;
  appointments: any[];
}

export interface GetWeeklyAppointmentsQuery {
  weeklyAppointments: GetWeeklyAppointmentsQuery_weeklyAppointments[];
}

export interface GetWeeklyAppointmentsQueryVariables {
  appointmentsInput: WeeklyAppointmentsInput;
}
