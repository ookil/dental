/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatmentCategory } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Query
// ====================================================

export interface Query_treatments {
  __typename: "Treatment";
  id: string;
  name: string;
  description: string;
  category: TreatmentCategory;
}

export interface Query {
  treatments: Query_treatments[];
}

export interface QueryVariables {
  category?: TreatmentCategory | null;
}
