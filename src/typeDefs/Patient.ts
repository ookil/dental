import 'reflect-metadata';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Dentist } from './Dentist';
import { Appointment } from './Appointment';
import { TreatmentStatus } from './Treatment';

@ObjectType()
export class Patient {
  @Field(() => ID)
  id: number;

  @Field()
  @Length(3, 10)
  name: string;

  @Field()
  @Length(3, 10)
  surname: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string | null;

  @Field(() => String, { nullable: true })
  @Length(3, 30)
  nationalId?: string | null;

  @Field()
  active: boolean;

  @Field(() => Dentist, { nullable: true })
  dentist?: Dentist;

  @Field(() => [Appointment], { nullable: true })
  appointments?: [Appointment];

  @Field(() => [ChartRecord], { nullable: true })
  patientChart?: ChartRecord[];
}

@ObjectType()
export class ChartRecord {
  @Field(() => ID)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  type: string;

  @Field()
  description: string;

  @Field()
  tooth: string;

  @Field(() => ToothSurface)
  surface: ToothSurface;

  @Field()
  doctor: String;

  @Field(() => TreatmentStatus)
  status: TreatmentStatus;
}

export enum ToothSurface {
  BUCCAL,
  LINGUAL,
  DISTAL,
  MESIAL,
  ROOT,
  CROWN,
}

registerEnumType(ToothSurface, { name: 'ToothSurface' });
