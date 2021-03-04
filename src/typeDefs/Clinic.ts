import 'reflect-metadata';
import { ObjectType, Field, ID, registerEnumType, Int } from 'type-graphql';
import { Appointment } from './Appointment';
import { Assistant } from './Assistant';
import { Dentist } from './Dentist';
import { Patient } from './Patient';
import { User } from './User';

@ObjectType()
export class ClinicSettings {
  @Field(() => ID)
  clinicId: number;

  @Field()
  workOnSaturday: boolean;

  @Field()
  workOnSunday: boolean;

  @Field(() => Int)
  workStartHour: number;

  @Field(() => Int)
  workStartMinutes: number;

  @Field(() => Int)
  workEndHour: number;

  @Field(() => Int)
  workEndMinutes: number;

  @Field(() => Int)
  appointmentDuration: number;
}

@ObjectType()
export class Clinic {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => User)
  admin: User;

  @Field(() => [Dentist], { nullable: true })
  dentists?: Dentist[];

  @Field(() => [Assistant], { nullable: true })
  assistants?: Assistant[];

  @Field(() => [Patient], { nullable: true })
  patients?: Patient[];

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];

  @Field(() => ClinicSettings)
  settings?: ClinicSettings;

  @Field()
  registeredAt: Date;

  @Field(() => [User], { nullable: true })
  users?: User[];
}

export enum Role {
  ADMIN = 'ADMIN',
  DENTIST = 'DENTIST',
  ASSISTANT = 'ASSISTANT',
  REGULAR = 'REGULAR',
}

registerEnumType(Role, { name: 'Role' });
