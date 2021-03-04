import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { Patient } from './Patient';
import { Appointment } from './Appointment';
import { Length } from 'class-validator';

@ObjectType()
export class Dentist {
  @Field(() => ID)
  id: number;

  @Field()
  @Length(3, 30)
  name: string;

  @Field()
  @Length(3, 30)
  surname: string;

  @Field()
  active: boolean;

  @Field(() => [Patient], { nullable: true })
  patients?: Patient[];

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];
}
