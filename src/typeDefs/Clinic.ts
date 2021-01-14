import 'reflect-metadata';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { Assistant } from './Assistant';
import { Dentist } from './Dentist';
import { Patient } from './Patient';
import { User } from './User';

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
  dentists?: [Dentist] | null;

  @Field(() => [Assistant], { nullable: true })
  assistants?: [Assistant] | null;

  @Field(() => [Patient], { nullable: true })
  patients?: [Patient] | null;

  @Field()
  registeredAt: Date;

  @Field(() => [User])
  users: [User];
}

export enum Role {
  ADMIN = 'ADMIN',
  DENTIST = 'DENTIST',
  ASSISTANT = 'ASSISTANT',
  REGULAR = 'REGULAR',
}

registerEnumType(Role, { name: 'Role' });
