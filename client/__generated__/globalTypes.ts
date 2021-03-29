/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AppointmentStatus {
  CANCELED = "CANCELED",
  CONFIRMED = "CONFIRMED",
  REGISTERED = "REGISTERED",
}

export enum TreatmentCategory {
  DIAGNOSTIC = "DIAGNOSTIC",
  ENDODONTICS = "ENDODONTICS",
  OTHER = "OTHER",
  PERIODONTICS = "PERIODONTICS",
  PREVENTIVE = "PREVENTIVE",
  PROSTHETICS = "PROSTHETICS",
}

/**
 * Variables for appointments list
 */
export interface AppointmentsListInput {
  clinicId: string;
  dentistId: string;
  date: any;
}

/**
 * Clinic options
 */
export interface ClinicAppointmentsOptions {
  workStartHour?: number | null;
  workStartMinutes?: number | null;
  workEndHour?: number | null;
  workEndMinutes?: number | null;
  workOnSaturday: boolean;
  workOnSunday: boolean;
  appointmentDuration?: number | null;
}

/**
 * New appointment data
 */
export interface CreateAppointmentInput {
  treatment: string;
  startAt: any;
  endAt: any;
  status?: AppointmentStatus | null;
  patientId: string;
  dentistId: string;
  clinicId: string;
}

/**
 * New patient data
 */
export interface CreatePatientInput {
  name: string;
  surname: string;
  email?: string | null;
  nationalId?: string | null;
  clinicId: string;
  dentistId: string;
}

/**
 * Get appointments
 */
export interface GetAppointmentsInput {
  clinicId: string;
  firstDay: any;
  lastDay: any;
}

/**
 * Get paginnated & sorted patients
 */
export interface GetPatientsInput {
  clinicId: string;
  pageSize: number;
  currentPage: number;
  orderBy: PatientsOrderBy;
  search?: string | null;
}

/**
 * Sorting patients
 */
export interface PatientsOrderBy {
  name?: string | null;
  surname?: string | null;
  bday?: string | null;
  appointments?: string | null;
}

/**
 * Update appointment data
 */
export interface UpdateAppointmentInput {
  treatment?: string | null;
  startAt?: any | null;
  endAt?: any | null;
  status?: AppointmentStatus | null;
  patientId?: string | null;
  dentistId?: string | null;
  clinicId?: string | null;
}

/**
 * New selected week
 */
export interface WeeklyAppointmentsInput {
  days: any[];
  clinicId: string;
  dentistId: string;
  currentDate: any;
  options?: ClinicAppointmentsOptions | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
