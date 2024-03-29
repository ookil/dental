import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Role } from './Clinic';
import { User } from './User';

@ObjectType()
export class Admin extends User {
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

  @Field(() => [Role], { nullable: true })
  roles: Role[];
}
