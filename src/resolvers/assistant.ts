import { Context } from '../context';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Length, IsEmail } from 'class-validator';
import { genSalt, hash } from 'bcrypt';
import { Assistant } from '../typeDefs/Assistant';
import { Dentist } from 'src/typeDefs/Dentist';

type UpdateAssistant = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  worksWithDentists?: Array<{ id: number }>;
};

@InputType({ description: 'New assistant data' })
export class CreateAssistantInput implements Partial<Assistant> {
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

  @Field(() => Int)
  clinicId: number;

  @Field(() => [Int])
  worksWithDentist: [number];
}

@InputType({ description: 'List of dentists' })
class DentistList {
  @Field(() => Int, { nullable: true })
  id: number;
}

@InputType({ description: 'New assistnat data' })
export class UpdateAssistantInput implements Partial<Assistant> {
  @Field({ nullable: true })
  @Length(3, 10)
  name?: string;

  @Field({ nullable: true })
  @Length(3, 10)
  surname?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Length(6, 20)
  password?: string;

  @Field(() => [DentistList], { nullable: true })
  worksWithDentists?: DentistList[];
}

@Resolver(Assistant)
export class AssistantResolver {
  @Query(() => Assistant, { nullable: true })
  async assistant(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.assistant.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Assistant)
  async createAssistant(
    @Arg('assistanttData') assistantData: CreateAssistantInput,
    @Ctx() { prisma }: Context
  ): Promise<Assistant> {
    const assistant = await prisma.assistant.findMany({
      where: {
        AND: [
          {
            email: assistantData.email,
          },
          {
            clinicId: assistantData.clinicId,
          },
        ],
      },
    });

    if (assistant.length) throw new Error('Assistant already exists!');

    const salt = await genSalt(10);

    return await prisma.assistant.create({
      data: {
        name: assistantData.name,
        surname: assistantData.surname,
        email: assistantData.email,
        password: await hash(assistantData.password, salt),
        clinic: {
          connect: {
            id: assistantData.clinicId,
          },
        },
      },
    });
  }

  @Mutation(() => Assistant)
  async deleteAssistant(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ): Promise<Assistant> {
    return await prisma.assistant.delete({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Assistant)
  async updateAssistant(
    @Arg('id', () => Int) id: number,
    @Arg('assistantData') assistantData: UpdateAssistantInput,
    @Ctx() { prisma }: Context
  ): Promise<Assistant> {
    const assistant = await prisma.assistant.findUnique({
      where: {
        id,
      },
    });

    if (!assistant) throw new Error('Assistant Not Found');

    const salt = await genSalt(10);

    let newData: UpdateAssistant = {};
    if (assistantData.name) newData.name = assistantData.name;
    if (assistantData.surname) newData.surname = assistantData.surname;
    if (assistantData.email) newData.email = assistantData.email;
    if (assistantData.password)
      newData.password = await hash(assistantData.password, salt);

    return await prisma.assistant.update({
      where: {
        id,
      },
      data: {
        ...newData,
        worksWith: {
          connect: assistantData.worksWithDentists,
        },
      },
    });
  }

  @FieldResolver()
  async worksWith(
    @Root() assistant: Assistant,
    @Ctx() { prisma }: Context
  ): Promise<Dentist[]> {
    return await prisma.assistant
      .findUnique({
        where: {
          id: assistant.id,
        },
      })
      .worksWith();
  }
}
