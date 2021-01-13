import 'reflect-metadata';
import { ObjectType, Field} from 'type-graphql';
import { Patient } from './Patient';
import { Appointment } from './Appointment';
import { User } from './User';

@ObjectType()
export class Dentist extends User {
  @Field()
  active: boolean;

  @Field(() => [Patient], { nullable: true })
  patients?: [Patient];

  @Field(() => [Appointment], { nullable: true })
  appointments?: [Appointment];
}
