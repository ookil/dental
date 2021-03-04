import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Dentist } from './Dentist';
import { Appointment } from './Appointment';
import { ChartRecord } from './ChartRecord';

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
  @IsEmail()
  @Length(3, 30)
  email?: string | null;

  @Field(() => String, { nullable: true })
  @Length(3, 30)
  nationalId?: string | null;

  @Field()
  active: boolean;

  @Field(() => Dentist, { nullable: true })
  dentist?: Dentist;

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];

  @Field(() => [ChartRecord], { nullable: true })
  patientChart?: ChartRecord[];
}
