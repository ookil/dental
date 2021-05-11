/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ActionType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDiagramCategories
// ====================================================

export interface GetDiagramCategories_diagramCategories_diagnostic_actions_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetDiagramCategories_diagramCategories_diagnostic_actions {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  type: ActionType;
  fillColor: string;
  crownAction: boolean;
  rootAction: boolean;
  icon: GetDiagramCategories_diagramCategories_diagnostic_actions_icon | null;
}

export interface GetDiagramCategories_diagramCategories_diagnostic {
  __typename: "ActionCategory";
  id: string;
  name: string;
  actions: GetDiagramCategories_diagramCategories_diagnostic_actions[];
}

export interface GetDiagramCategories_diagramCategories_procedures_actions_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetDiagramCategories_diagramCategories_procedures_actions {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  type: ActionType;
  fillColor: string;
  crownAction: boolean;
  rootAction: boolean;
  icon: GetDiagramCategories_diagramCategories_procedures_actions_icon | null;
}

export interface GetDiagramCategories_diagramCategories_procedures {
  __typename: "ActionCategory";
  id: string;
  name: string;
  actions: GetDiagramCategories_diagramCategories_procedures_actions[];
}

export interface GetDiagramCategories_diagramCategories {
  __typename: "ActionTypeCategories";
  diagnostic: GetDiagramCategories_diagramCategories_diagnostic[];
  procedures: GetDiagramCategories_diagramCategories_procedures[];
}

export interface GetDiagramCategories {
  diagramCategories: GetDiagramCategories_diagramCategories;
}

export interface GetDiagramCategoriesVariables {
  clinicId: string;
}
