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
  ID,
} from 'type-graphql';
import { Role } from '../typeDefs/Clinic';
import { IsEmail, Length } from 'class-validator';
import { AuthToken, User } from '../typeDefs/User';
import { ForbiddenError, UserInputError } from 'apollo-server-express';
import { createUnionType } from 'type-graphql';
import { Dentist } from '../typeDefs/Dentist';
import { Assistant } from '../typeDefs/Assistant';

const RoleResultUnion = createUnionType({
  name: 'RoleResultUnion', // the name of the GraphQL union
  types: () => [Dentist, Assistant] as const, // function that returns tuple of object types classes
  resolveType: (value) => {
    if ('patients' in value) {
      return Dentist; // we can return object type class (the one with `@ObjectType()`)
    }

    if ('worksWith' in value) {
      return Assistant; // we can return object type class (the one with `@ObjectType()`)
    }

    return undefined;
  },
});

@InputType({ description: 'Login  user' })
export class DeleteUserInput implements Partial<User> {
  @Field(() => Int)
  id: number;

  @Field(() => Role)
  role: Role;

  @Field(() => Int)
  clinicId: number;
}

@InputType({ description: 'Login  user' })
export class LoginDataInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType({ description: 'New user data' })
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

  @Field(() => ID)
  clinicId: number | string;
}

@InputType({ description: 'New user data' })
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Length(6, 20)
  password?: string;

  @Field(() => Role)
  role: Role;

  @Field({ nullable: true })
  isAdmin?: boolean;

  @Field(() => ID)
  userId: number | string;
}

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async user(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  @Authorized()
  @Query(() => RoleResultUnion, { nullable: true })
  async getUserProfile(
    @Arg('userId', () => ID) userId: string,
    @Arg('occupation') occupation: Role,
    @Ctx() { prisma }: Context
  ): Promise<typeof RoleResultUnion | null> {
    let dentist;
    let assistant;
    if (occupation === Role.DENTIST) {
      dentist = await prisma.dentist.findUnique({
        where: { id: parseInt(userId) },
        include: {
          patients: true,
        },
      });
    }

    if (occupation === Role.ASSISTANT) {
      assistant = await prisma.assistant.findUnique({
        where: { id: parseInt(userId) },
      });
    }

    if (dentist) return dentist;
    if (assistant) return assistant;

    return null;
  }

  @Authorized()
  @Query(() => User)
  async loggedUser(@Ctx() { prisma, user: loggedUser }: Context) {
    return await prisma.user.findUnique({
      where: {
        id: loggedUser?.id,
      },
    });
  }

  @Authorized('ADMIN')
  @Mutation(() => User)
  async createUser(
    @Arg('userData') userData: CreateUserInput,
    @Ctx() { prisma, user: loggedUser }: Context
  ) {
    if (typeof userData.clinicId === 'string')
      userData.clinicId = parseInt(userData.clinicId);

    // check if admin of clinic
    const admin = await prisma.clinic.findMany({
      where: {
        AND: [
          {
            id: userData.clinicId,
          },
          {
            adminId: loggedUser?.id!,
          },
        ],
      },
    });

    if (!admin.length) throw new Error("You don't have access to this action");

    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (user) throw new Error('User already exists!');

    let userRoles = [userData.role];
    if (userData.isAdmin) userRoles.push(Role.ADMIN);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userData.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: password,
        roles: userRoles,
        occupation: userData.role
      },
    });

    await prisma.userInClinic.create({
      data: {
        clinic: { connect: { id: userData.clinicId } },
        user: { connect: { id: newUser.id } },
      },
    });

    if (userData.role === Role.DENTIST) {
      await prisma.dentist.create({
        data: {
          id: newUser.id,
          name: userData.name,
          surname: userData.surname,
          clinic: {
            connect: {
              id: userData.clinicId,
            },
          },
        },
      });
    }

    if (userData.role === Role.ASSISTANT) {
      await prisma.assistant.create({
        data: {
          id: newUser.id,
          name: userData.name,
          surname: userData.surname,
          clinic: {
            connect: {
              id: userData.clinicId,
            },
          },
        },
      });
    }

    return newUser;
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg('userData') userData: UpdateUserInput,
    @Ctx() { prisma, user: logedUser }: Context
  ) {
    if (typeof userData.userId === 'string')
      userData.userId = parseInt(userData.userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userData.userId,
      },
    });

    if (!user) throw new Error('User does not exists!');

    // check if correct user logged in or user is an admin
    if (user.id !== logedUser?.id || !logedUser.roles.includes(Role.ADMIN))
      throw Error(`You don't have permission for this action`);

    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    let userRoles = [userData.role];

    if (userData.isAdmin) userRoles.push(Role.ADMIN);

    return await prisma.user.update({
      where: { id: userData.userId },
      data: {
        email: userData.email,
        password: userData.password,
        roles: userRoles,
      },
    });
  }

  @Mutation(() => AuthToken)
  async loginUser(
    @Arg('loginData') loginData: LoginDataInput,
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
        roles: user.roles,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    return { token };
  }

  @Authorized('ADMIN')
  @Mutation(() => User)
  async deleteUser(
    @Arg('deleteUserData', () => DeleteUserInput)
    deleteUserData: DeleteUserInput,
    @Ctx() { prisma, user: loggedUser }: Context
  ) {
    // check if admin of clinic
    const admin = await prisma.clinic.findMany({
      where: {
        AND: [
          {
            id: deleteUserData.clinicId,
          },
          {
            adminId: loggedUser?.id!,
          },
        ],
      },
    });

    if (!admin.length) throw new Error("You don't have access to this action");

    if (deleteUserData.role === Role.DENTIST) {
      await prisma.dentist.delete({
        where: {
          id: deleteUserData.id,
        },
      });
    }

    if (deleteUserData.role === Role.ASSISTANT) {
      await prisma.assistant.delete({
        where: {
          id: deleteUserData.id,
        },
      });
    }

    await prisma.userInClinic.delete({
      where: {
        userId: deleteUserData.id,
      },
    });

    return await prisma.user.delete({
      where: {
        id: deleteUserData.id,
      },
    });
  }

  @FieldResolver()
  async owningClinics(@Root() user: User, @Ctx() { prisma }: Context) {
    return await prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .owningClinics();
  }

  @FieldResolver()
  async clinic(@Root() user: User, @Ctx() { prisma }: Context) {
    const res = await prisma.userInClinic.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        clinic: true,
      },
    });

    return res?.clinic;
  }
}
