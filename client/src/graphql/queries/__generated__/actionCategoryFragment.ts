/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ActionType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: actionCategoryFragment
// ====================================================

export interface actionCategoryFragment_actions_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface actionCategoryFragment_actions {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  type: ActionType;
  fillColor: string;
  crownAction: boolean;
  rootAction: boolean;
  icon: actionCategoryFragment_actions_icon | null;
}

export interface actionCategoryFragment {
  __typename: "ActionCategory";
  actions: actionCategoryFragment_actions[];
}
