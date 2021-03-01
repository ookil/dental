export type AppointmentPayload = {
  mutation: 'ADDED' | 'UPDATED' | 'DELETED';
  content: any;
};
