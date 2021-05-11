/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: surfaceFillFragment
// ====================================================

export interface surfaceFillFragment_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface surfaceFillFragment_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: surfaceFillFragment_action_icon | null;
}

export interface surfaceFillFragment {
  __typename: "SurfaceFill";
  action: surfaceFillFragment_action;
}
