import { Appointment } from "@prisma/client";


export type AppointmentPayload = {
  mutation: 'ADDED' | 'UPDATED' | 'DELETED';
  data: Appointment;
};
