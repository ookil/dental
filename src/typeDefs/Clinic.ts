import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { Admin } from './Admin';
import { Assistant } from './Assistant';
import { Dentist } from './Dentist';
import { Patient } from './Patient';

@ObjectType()
export class Clinic {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => Admin)
  admin: Admin;

  @Field(() => [Dentist], { nullable: true })
  dentists?: [Dentist] | null;

  @Field(() => [Assistant], { nullable: true })
  assistants?: [Assistant] | null;

  @Field(() => [Patient], { nullable: true })
  patients?: [Patient] | null;

  @Field()
  registeredAt: Date;
}
