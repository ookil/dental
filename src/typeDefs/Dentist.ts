import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Patient } from './Patient';
import { Appointment } from './Appointment';

@ObjectType()
export class Dentist {
  @Field(() => ID)
  id: number;

  @Field()
  @Length(3, 10)
  name: string;

  @Field()
  @Length(3, 10)
  surname: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 20)
  password: string;

  @Field()
  active: boolean;

  @Field(() => [Patient], { nullable: true })
  patients?: [Patient];

  @Field(() => [Appointment], { nullable: true })
  appointments?: [Appointment];
}
