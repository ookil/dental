/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetUserProfile
// ====================================================

export interface GetUserProfile_getUserProfile_Dentist_appointments {
  __typename: "Appointment";
  id: string;
  status: AppointmentStatus;
}

export interface GetUserProfile_getUserProfile_Dentist {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
  nameWithSurname: string | null;
  active: boolean;
  appointments: GetUserProfile_getUserProfile_Dentist_appointments[] | null;
}

export interface GetUserProfile_getUserProfile_Assistant {
  __typename: "Assistant";
  id: string;
  name: string;
  surname: string;
  active: boolean;
}

export type GetUserProfile_getUserProfile = GetUserProfile_getUserProfile_Dentist | GetUserProfile_getUserProfile_Assistant;

export interface GetUserProfile {
  getUserProfile: GetUserProfile_getUserProfile | null;
}

export interface GetUserProfileVariables {
  occupation: string;
  userId: string;
}
