import { Length } from 'class-validator';
import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { Dentist } from './Dentist';

@ObjectType()
export class Assistant {
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

  @Field(() => [Dentist], { nullable: true })
  worksWith?: Dentist[];
}
