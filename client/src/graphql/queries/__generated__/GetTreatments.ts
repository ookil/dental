/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatmentCategory } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetTreatments
// ====================================================

export interface GetTreatments_treatments {
  __typename: "Treatment";
  id: string;
  name: string;
  description: string;
  category: TreatmentCategory;
}

export interface GetTreatments {
  treatments: GetTreatments_treatments[];
}

export interface GetTreatmentsVariables {
  category?: TreatmentCategory | null;
}
