import 'reflect-metadata';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Dentist } from './Dentist';
import { Appointment } from './Appointment';
import { ChartRecord } from './ChartRecord';

@ObjectType()
class PatientAddress {
  @Field({ nullable: true })
  @Length(3, 100)
  street?: string;

  @Field({ nullable: true })
  @Length(1, 100)
  houseNum: string;

  @Field({ nullable: true })
  @Length(1, 100)
  city: string;

  @Field({ nullable: true })
  @Length(1, 100)
  zipCode: string;

  @Field({ nullable: true })
  @Length(1, 100)
  country: string;
}

@ObjectType()
export class Patient {
  @Field(() => ID)
  id: number;

  @Field()
  @Length(3, 30)
  name: string;

  @Field()
  @Length(3, 30)
  surname: string;

  @Field(() => String, { nullable: true })
  @Length(3, 30)
  nationalId?: string | null;

  @Field(() => Date, { nullable: true })
  bday?: Date | null;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @Length(3, 30)
  email?: string | null;

  @Field(() => String, { nullable: true })
  @Length(3, 100)
  mobile?: string | null;

  @Field(() => String, { nullable: true })
  @Length(3, 100)
  phone?: string | null;

  @Field(() => PatientAddress)
  address?: PatientAddress;

  @Field()
  active: boolean;

  @Field(() => Dentist, { nullable: true })
  dentist?: Dentist;

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];

  @Field(() => [ChartRecord], { nullable: true })
  patientChart?: ChartRecord[];
}

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(Sort, { name: 'Sort' });

@ObjectType()
export class PatientsList {
  @Field()
  patients: Patient[];

  @Field()
  totalCount: number;
}

/* @ObjectType()
export class PatientsConnection {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field()
  hasMore: boolean;

  @Field(() => [Patient])
  patients: Patient[];
}
 */
