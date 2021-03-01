/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: AppointmentsDeleteSub
// ====================================================

export interface AppointmentsDeleteSub_appointmentsDeleteSub_content {
  __typename: "Appointment";
  id: string;
}

export interface AppointmentsDeleteSub_appointmentsDeleteSub {
  __typename: "AppointmentSubscription";
  mutation: string;
  content: AppointmentsDeleteSub_appointmentsDeleteSub_content;
}

export interface AppointmentsDeleteSub {
  appointmentsDeleteSub: AppointmentsDeleteSub_appointmentsDeleteSub;
}

export interface AppointmentsDeleteSubVariables {
  clinicId: string;
}
