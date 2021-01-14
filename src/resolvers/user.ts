import 'reflect-metadata';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Context } from '../index';
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  InputType,
  Field,
  Mutation,
  Authorized,
} from 'type-graphql';
import { Clinic, Role } from '../typeDefs/Clinic';
import { IsEmail, Length } from 'class-validator';
import { AuthToken, User } from '../typeDefs/User';
import { ForbiddenError, UserInputError } from 'apollo-server-express';

@InputType({ description: 'Login  user' })
export class LoginData implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType({ description: 'New admin data' })
export class CreateUserInput implements Partial<User> {
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

  @Field(() => Role)
  role: Role;

  @Field({ nullable: true })
  isAdmin?: boolean;

  @Field(() => Int, { nullable: true })
  clinicId?: number;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => Int) id: number, @Ctx() { prisma }: Context) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  @Authorized('ADMIN')
  @Mutation(() => User)
  async createUser(
    @Arg('userData') userData: CreateUserInput,
    @Ctx() { prisma }: Context
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (user) throw new Error('User already exists!');

    const salt = await bcrypt.genSalt(10);

    let userRoles = [userData.role];

    if (userData.isAdmin) userRoles.push(Role.ADMIN);

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, salt),
        roles: userRoles,
        clinics: {
          connect: {
            id: userData.clinicId,
          },
        },
      },
    });

    if (userData.role === Role.DENTIST) {
      const dentist = await prisma.dentist.create({
        data: {
          id: newUser.id,
          email: userData.email,
          name: userData.name,
          surname: userData.surname,
          clinic: {
            connect: {
              id: userData.clinicId,
            },
          },
        },
      });
      return dentist;
    }

    if (userData.role === Role.ASSISTANT) {
      const assistant = await prisma.assistant.create({
        data: {
          id: newUser.id,
          email: userData.email,
          name: userData.name,
          surname: userData.surname,
          clinic: {
            connect: {
              id: userData.clinicId,
            },
          },
        },
      });
      return assistant;
    }

    return newUser;
  }

  @Mutation()
  async loginUser(
    @Arg('loginData') loginData: LoginData,
    @Ctx() { prisma }: Context
  ): Promise<AuthToken> {
    const user = await prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });

    if (!user) throw new UserInputError(`User doesn't exist`);

    const isMatch = await bcrypt.compare(loginData.password, user.password);

    if (!isMatch) throw new ForbiddenError('Invalid credentials');

    const payload = {
      user: {
        id: user.id,
        role: user.roles[0],
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    return { token };
  }

  @FieldResolver()
  async clinics(@Root() clinic: Clinic, @Ctx() { prisma }: Context) {
    return await prisma.user
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .clinics();
  }
}
