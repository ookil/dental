import { Context } from '../context';
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
import { Treatment } from '../typeDefs/Treatment';
import { Teeth, ToothSurface } from '../typeDefs/Teeth';

@InputType({ description: 'Upsert tooth data' })
export class CreateTeethInput implements Partial<Teeth> {
  @Field(() => Int)
  patientId: number;

  @Field()
  @Length(2, 3)
  toothId: string;

  @Field(() => ToothSurface)
  surface: ToothSurface;

  @Field(() => Int)
  treatmentId: number;
}

@InputType({ description: 'Delete tooth data' })
export class DeleteTeethInput implements Partial<Teeth> {
  @Field(() => Int)
  patientId: number;

  @Field()
  @Length(2, 3)
  id: string;

  @Field(() => ToothSurface)
  surface: ToothSurface;
}

@InputType({ description: 'Update tooth data' })
export class UpdateTeethInput implements Partial<Teeth> {
  @Field(() => Int)
  patientId: number;

  @Field()
  @Length(2, 3)
  id: string;

  @Field(() => ToothSurface)
  surface?: ToothSurface;

  @Field(() => Treatment)
  @Length(3, 100)
  description?: Treatment;

  @Field()
  createdAt: Date;
}

@Resolver(Teeth)
export class TeethResolver {
  @Authorized()
  @Query(() => Teeth, { nullable: true })
  async tooth(
    @Arg('patientId', () => Int) patientId: number,
    @Arg('id') id: string,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.teeth.findMany({
      where: {
        AND: [
          {
            patientId,
          },
          { id },
        ],
      },
    });
  }

  @Authorized()
  @Query(() => [Teeth], { nullable: true })
  async patientTeeth(
    @Arg('patientId', () => Int) patientId: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.teeth.findMany({
      where: {
        patientId,
      },
    });
  }

  @Authorized()
  @Mutation(() => Teeth)
  async createToothTreatment(
    @Arg('createToothTreatmentData') createToothTreatmentData: CreateTeethInput,
    @Ctx() { prisma }: Context
  ) {
    // each tooth should only show up once in a database since this will be responsible
    // for displaying teeth treatment, so when the same tooth+surface were to be created
    // instead it's gonna update it

    // logic for action on crown or root
    if (
      createToothTreatmentData.surface === ToothSurface.CROWN ||
      createToothTreatmentData.surface === ToothSurface.ROOT
    ) {
      await prisma.teeth.deleteMany({
        where: {
          AND: [
            {
              patientId: createToothTreatmentData.patientId,
            },
            {
              id: createToothTreatmentData.toothId,
            },
          ],
        },
      });
    }

    return await prisma.teeth.upsert({
      where: {
        id_surface_patientId: {
          id: createToothTreatmentData.toothId,
          surface: createToothTreatmentData.surface,
          patientId: createToothTreatmentData.patientId,
        },
      },
      create: {
        id: createToothTreatmentData.toothId,
        surface: createToothTreatmentData.surface,
        patient: { connect: { id: createToothTreatmentData.patientId } },
        treatment: { connect: { id: createToothTreatmentData.treatmentId } },
        createdAt: new Date(),
      },
      update: {
        treatment: { connect: { id: createToothTreatmentData.treatmentId } },
        createdAt: new Date(),
      },
    });
  }

  @Authorized()
  @Mutation(() => Teeth)
  async deleteToothTreatment(
    @Arg('toothData', () => DeleteTeethInput) toothData: DeleteTeethInput,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.teeth.delete({
      where: {
        id_surface_patientId: {
          id: toothData.id,
          surface: toothData.surface,
          patientId: toothData.patientId,
        },
      },
    });
  }

  @FieldResolver()
  async treatment(@Root() teeth: Teeth, @Ctx() { prisma }: Context) {
    return await prisma.teeth
      .findUnique({
        where: {
          id_surface_patientId: {
            id: teeth.id,
            surface: teeth.surface,
            patientId: teeth.patientId,
          },
        },
      })
      .treatment();
  }
}
