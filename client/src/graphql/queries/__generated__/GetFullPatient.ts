/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetFullPatient
// ====================================================

export interface GetFullPatient_patient_address {
  __typename: "PatientAddress";
  street: string | null;
  houseNum: string | null;
  city: string | null;
  zipCode: string | null;
  country: string | null;
}

export interface GetFullPatient_patient_appointments_dentist {
  __typename: "Dentist";
  id: string;
  name: string;
  surname: string;
}

export interface GetFullPatient_patient_appointments {
  __typename: "Appointment";
  treatment: string;
  startAt: any;
  endAt: any;
  createdAt: any;
  status: AppointmentStatus;
  dentist: GetFullPatient_patient_appointments_dentist;
}

export interface GetFullPatient_patient {
  __typename: "Patient";
  id: string;
  name: string;
  surname: string;
  nationalId: string | null;
  bday: any | null;
  email: string | null;
  mobile: string | null;
  phone: string | null;
  address: GetFullPatient_patient_address;
  active: boolean;
  appointments: GetFullPatient_patient_appointments[] | null;
}

export interface GetFullPatient {
  patient: GetFullPatient_patient | null;
}

export interface GetFullPatientVariables {
  patientId: string;
}
