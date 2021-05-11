/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatientInfo
// ====================================================

export interface GetPatientInfo_patient_address {
  __typename: "PatientAddress";
  street: string | null;
  houseNum: string | null;
  city: string | null;
  zipCode: string | null;
  country: string | null;
}

export interface GetPatientInfo_patient {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  nationalId: string | null;
  bday: any | null;
  email: string | null;
  mobile: string | null;
  phone: string | null;
  address: GetPatientInfo_patient_address | null;
  active: boolean;
}

export interface GetPatientInfo {
  patient: GetPatientInfo_patient | null;
}

export interface GetPatientInfoVariables {
  patientId: string;
}
