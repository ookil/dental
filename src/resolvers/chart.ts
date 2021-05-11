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

import { Patient } from '../typeDefs/Patient';
import { Length } from 'class-validator';
import { ChartRecord } from '../typeDefs/ChartRecord';
import { TreatmentStatus } from '../typeDefs/Treatment';
import { Context } from '../index';

@InputType({ description: 'New patient chart data' })
export class CreateChartRecordInput implements Partial<ChartRecord> {
  @Field()
  @Length(3, 20)
  type: string;

  @Field()
  @Length(3, 100)
  description: string;

  @Field()
  @Length(2, 3)
  tooth: string;

  @Field()
  @Length(3, 10)
  doctor: string;

  @Field(() => TreatmentStatus)
  status: TreatmentStatus;

  @Field(() => Int)
  patientId: number;
}

@InputType({ description: 'Update record data' })
export class UpdateChartRecordInput implements Partial<ChartRecord> {
  @Field({ nullable: true })
  @Length(3, 20)
  type?: string;

  @Field({ nullable: true })
  @Length(3, 100)
  description?: string;

  @Field({ nullable: true })
  @Length(2, 3)
  tooth?: string;

  @Field({ nullable: true })
  @Length(3, 10)
  doctor?: string;

  @Field(() => TreatmentStatus, { nullable: true })
  status?: TreatmentStatus;
}

@Resolver(ChartRecord)
export class ChartRecordResolver {
  @Authorized()
  @Query(() => ChartRecord, { nullable: true })
  async chartRecord(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.chartRecord.findUnique({
      where: {
        id,
      },
    });
  }

  @Authorized()
  @Query(() => [ChartRecord], { nullable: true })
  async patientChart(
    @Arg('patientId', () => Int) patientId: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.chartRecord.findMany({
      where: {
        patientId,
      },
    });
  }

  @Authorized()
  @Mutation(() => ChartRecord)
  async createChartRecord(
    @Arg('chartRecordData') chartRecordData: CreateChartRecordInput,
    @Ctx() { prisma }: Context
  ) {
    // do I need to verify if the same chart record exist?

    return await prisma.chartRecord.create({
      data: {
        createdAt: new Date(),
        type: chartRecordData.type,
        description: chartRecordData.description,
        tooth: chartRecordData.tooth,
        doctor: chartRecordData.doctor,
        status: chartRecordData.status,
        patient: {
          connect: {
            id: chartRecordData.patientId,
          },
        },
      },
    });
  }

  @Authorized()
  @Mutation(() => ChartRecord)
  async deleteChartRecord(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.chartRecord.delete({
      where: {
        id,
      },
    });
  }

  @Authorized()
  @Mutation(() => ChartRecord)
  async updateChartRecord(
    @Arg('id', () => Int) id: number,
    @Arg('chartRecord') chartRecord: UpdateChartRecordInput,
    @Ctx() { prisma }: Context
  ) {
    const record = await prisma.chartRecord.findUnique({
      where: {
        id,
      },
    });

    if (!record) throw new Error('Record Not Found');

    return await prisma.chartRecord.update({
      where: {
        id,
      },
      data: {
        ...chartRecord,
      },
    });
  }

  @FieldResolver()
  async patient(
    @Root() chartRecord: ChartRecord,
    @Ctx() { prisma }: Context
  ): Promise<Patient | null> {
    return await prisma.appointment
      .findUnique({
        where: {
          id: chartRecord.id,
        },
      })
      .patient();
  }
}
