import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Dentist } from './Dentist';
import { Patient } from './Patient';

export enum AppointmentStatus {
  REGISTERED = 'REGISTERED',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
}

registerEnumType(AppointmentStatus, { name: 'AppointmentStatus' });

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id: number;

  @Field()
  treatment: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  createdAt: Date;

  @Field(() => AppointmentStatus)
  status: AppointmentStatus;

  @Field(() => Patient)
  patient: Patient;

  @Field(() => Dentist)
  dentist: Dentist;
}
