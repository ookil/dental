/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoggedUser
// ====================================================

export interface LoggedUser_loggedUser_clinic {
  __typename: "Clinic";
  id: string;
}

export interface LoggedUser_loggedUser {
  __typename: "User";
  id: string;
  clinic: LoggedUser_loggedUser_clinic;
}

export interface LoggedUser {
  loggedUser: LoggedUser_loggedUser;
}
