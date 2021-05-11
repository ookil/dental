/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role } from "./../../../../__generated__/globalTypes";

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
  roles: Role[];
  occupation: Role;
  clinic: LoggedUser_loggedUser_clinic;
}

export interface LoggedUser {
  loggedUser: LoggedUser_loggedUser;
}
