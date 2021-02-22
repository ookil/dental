/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loggedUser
// ====================================================

export interface loggedUser_loggedUser_clinic {
  __typename: "Clinic";
  id: string;
}

export interface loggedUser_loggedUser {
  __typename: "User";
  id: string;
  clinic: loggedUser_loggedUser_clinic;
}

export interface loggedUser {
  loggedUser: loggedUser_loggedUser;
}
