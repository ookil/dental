import 'reflect-metadata';
import { ObjectType, Field, ID, Authorized } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Clinic, Role } from './Clinic';

@ObjectType()
export class AuthToken {
  @Field()
  token: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 20)
  password: string;

  @Field(() => [Role])
  roles?: Role[];

  @Field(() => Role)
  occupation: Role;

  @Field(() => [Clinic], { nullable: true })
  owningClinics?: Clinic[];

  @Field(() => Clinic)
  clinic: Clinic;
}
