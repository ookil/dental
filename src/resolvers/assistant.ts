import { Context } from '../index';
import {
  Arg,
  Authorized,
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

import { Length } from 'class-validator';
import { Assistant } from '../typeDefs/Assistant';

type UpdateAssistant = {
  name?: string;
  surname?: string;
  worksWithDentists?: Array<{ id: number }>;
};

@InputType({ description: 'List of dentists' })
class DentistList {
  @Field(() => Int, { nullable: true })
  id: number;
}

@InputType({ description: 'Update assistant data' })
export class UpdateAssistantInput implements Partial<Assistant> {
  @Field({ nullable: true })
  @Length(3, 10)
  name?: string;

  @Field({ nullable: true })
  @Length(3, 10)
  surname?: string;

  @Field(() => [DentistList], { nullable: true })
  worksWithDentists?: DentistList[];

  @Field({ nullable: true })
  active?: boolean;
}

@Resolver(Assistant)
export class AssistantResolver {
  @Authorized()
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

  @Authorized(['ADMIN', 'DENTIST', 'ASSISTANT'])
  @Mutation(() => Assistant)
  async updateAssistant(
    @Arg('id', () => Int) id: number,
    @Arg('assistantData') assistantData: UpdateAssistantInput,
    @Ctx() { prisma }: Context
  ) {
    const assistant = await prisma.assistant.findUnique({
      where: {
        id,
      },
      include: {
        worksWith: {
          select: { id: true },
        },
      },
    });

    if (!assistant) throw new Error('Assistant Not Found');

    let newData: UpdateAssistant = {};
    if (assistantData.name) newData.name = assistantData.name;
    if (assistantData.surname) newData.surname = assistantData.surname;

    let disconnectIds = undefined;
    if (assistantData.worksWithDentists) {
      const diff = assistant.worksWith.filter(
        ({ id: id1 }) =>
          !assistantData.worksWithDentists?.some(({ id: id2 }) => id2 === id1)
      );

      if (diff.length) disconnectIds = diff;
      /* console.log(disconnectIds); */
    }

    return await prisma.assistant.update({
      where: {
        id,
      },
      data: {
        ...newData,
        worksWith: {
          connect: assistantData.worksWithDentists,
          disconnect: disconnectIds,
        },
      },
    });
  }

  @FieldResolver()
  async worksWith(@Root() assistant: Assistant, @Ctx() { prisma }: Context) {
    return await prisma.assistant
      .findUnique({
        where: {
          id: assistant.id,
        },
      })
      .worksWith();
  }
}
