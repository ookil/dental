import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { Dentist } from './Dentist';
import { User } from './User';

@ObjectType()
export class Assistant extends User {
  @Field()
  active: boolean;

  @Field(() => [Dentist], { nullable: true })
  worksWith?: [Dentist];
}
