import { Context } from '../index';
import { Dentist } from '../typeDefs/Dentist';
import { Patient } from '../typeDefs/Patient';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Length } from 'class-validator';

@InputType({ description: 'Update dentist data' })
export class UpdateDentistInput implements Partial<Dentist> {
  @Field({ nullable: true })
  @Length(3, 10)
  name?: string;

  @Field({ nullable: true })
  @Length(3, 10)
  surname?: string;

  @Field({ nullable: true })
  active?: boolean;
}

@Resolver(Dentist)
export class DentistResolver {
  @Authorized()
  @Query(() => Dentist, { nullable: true })
  async dentist(@Arg('id', () => ID) id: string, @Ctx() { prisma }: Context) {
    return await prisma.dentist.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  @Authorized(['ADMIN', 'DENTIST', 'ASSISTANT'])
  @Mutation(() => Dentist)
  async updateDentist(
    @Arg('id', () => ID) id: string,
    @Arg('dentistData') dentistData: UpdateDentistInput,
    @Ctx() { prisma }: Context
  ) {
    const dentist = await prisma.dentist.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!dentist) throw new Error('Dentist Not Found');

    return await prisma.dentist.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...dentistData,
      },
    });
  }

  @FieldResolver()
  async patients(
    @Root() dentist: Dentist,
    @Ctx() { prisma }: Context
  ): Promise<Patient[]> {
    return await prisma.dentist
      .findUnique({
        where: {
          id: dentist.id,
        },
      })
      .patients();
  }

  @FieldResolver()
  async appointments(@Root() dentist: Dentist, @Ctx() { prisma }: Context) {
    const appointments = await prisma.dentist
      .findUnique({
        where: {
          id: dentist.id,
        },
      })
      .appointments();

    return appointments;
  }
}
