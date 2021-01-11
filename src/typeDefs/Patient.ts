import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Dentist } from './Dentist';
import { Appointment } from './Appointment';

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
  nationalId?: string | null;

  @Field()
  active: boolean;

  @Field(() => Dentist, { nullable: true })
  dentist?: Dentist;

  @Field(() => [Appointment], { nullable: true })
  appointments?: [Appointment];
}
