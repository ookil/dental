/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatientTeeth
// ====================================================

export interface GetPatientTeeth_patientTeeth_crown_buccal_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_crown_buccal_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_crown_buccal_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_crown_buccal {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_crown_buccal_action;
}

export interface GetPatientTeeth_patientTeeth_crown_distal_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_crown_distal_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_crown_distal_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_crown_distal {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_crown_distal_action;
}

export interface GetPatientTeeth_patientTeeth_crown_lingual_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_crown_lingual_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_crown_lingual_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_crown_lingual {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_crown_lingual_action;
}

export interface GetPatientTeeth_patientTeeth_crown_mesial_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_crown_mesial_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_crown_mesial_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_crown_mesial {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_crown_mesial_action;
}

export interface GetPatientTeeth_patientTeeth_crown_occlusial_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_crown_occlusial_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_crown_occlusial_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_crown_occlusial {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_crown_occlusial_action;
}

export interface GetPatientTeeth_patientTeeth_crown {
  __typename: "CrownSurface";
  buccal: GetPatientTeeth_patientTeeth_crown_buccal | null;
  distal: GetPatientTeeth_patientTeeth_crown_distal | null;
  lingual: GetPatientTeeth_patientTeeth_crown_lingual | null;
  mesial: GetPatientTeeth_patientTeeth_crown_mesial | null;
  occlusial: GetPatientTeeth_patientTeeth_crown_occlusial | null;
}

export interface GetPatientTeeth_patientTeeth_root_rootOne_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_root_rootOne_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_root_rootOne_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_root_rootOne {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_root_rootOne_action;
}

export interface GetPatientTeeth_patientTeeth_root_rootTwo_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_root_rootTwo_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_root_rootTwo_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_root_rootTwo {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_root_rootTwo_action;
}

export interface GetPatientTeeth_patientTeeth_root_rootThree_action_icon {
  __typename: "Icon";
  id: string;
  alt: string;
}

export interface GetPatientTeeth_patientTeeth_root_rootThree_action {
  __typename: "SurfaceAction";
  id: string;
  name: string;
  fillColor: string;
  icon: GetPatientTeeth_patientTeeth_root_rootThree_action_icon | null;
}

export interface GetPatientTeeth_patientTeeth_root_rootThree {
  __typename: "SurfaceFill";
  action: GetPatientTeeth_patientTeeth_root_rootThree_action;
}

export interface GetPatientTeeth_patientTeeth_root {
  __typename: "RootSurface";
  rootOne: GetPatientTeeth_patientTeeth_root_rootOne | null;
  rootTwo: GetPatientTeeth_patientTeeth_root_rootTwo | null;
  rootThree: GetPatientTeeth_patientTeeth_root_rootThree | null;
}

export interface GetPatientTeeth_patientTeeth {
  __typename: "Tooth";
  id: string;
  position: string;
  primary: boolean;
  quadrant: number;
  toothNumber: number;
  crown: GetPatientTeeth_patientTeeth_crown | null;
  root: GetPatientTeeth_patientTeeth_root | null;
}

export interface GetPatientTeeth {
  patientTeeth: GetPatientTeeth_patientTeeth[] | null;
}

export interface GetPatientTeethVariables {
  patientId: string;
}
