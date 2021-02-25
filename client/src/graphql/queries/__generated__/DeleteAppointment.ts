/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAppointment
// ====================================================

export interface DeleteAppointment_deleteAppointment {
  __typename: "Appointment";
  id: string;
}

export interface DeleteAppointment {
  deleteAppointment: DeleteAppointment_deleteAppointment;
}

export interface DeleteAppointmentVariables {
  appointmentId: string;
}
