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
import { Dentist } from '../typeDefs/Dentist';
import { Patient } from '../typeDefs/Patient';

@InputType({ description: 'New patient data' })
export class CreatePatientInput implements Partial<Patient> {
  @Field()
  @Length(3, 10)
  name: string;

  @Field()
  @Length(3, 10)
  surname: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @Length(3, 30)
  nationalId?: string | null;

  @Field(() => Int)
  clinicId: number;
}

@InputType({ description: 'Update patient data' })
export class UpdatePatientInput implements Partial<Patient> {
  @Field({ nullable: true })
  @Length(3, 10)
  name?: string;

  @Field({ nullable: true })
  @Length(3, 10)
  surname?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @Length(3, 30)
  nationalId?: string | null;

  @Field({ nullable: true })
  active?: boolean;
}

@Resolver(Patient)
export class PatientResolver {
  @Query(() => Patient, { nullable: true })
  async patient(@Arg('id', () => Int) id: number, @Ctx() { prisma }: Context) {
    return await prisma.patient.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Patient)
  async createPatient(
    @Arg('patientData') patientData: CreatePatientInput,
    @Ctx() { prisma }: Context
  ): Promise<Patient> {
    if (patientData.email === undefined && patientData.nationalId === undefined)
      throw new Error('Please provide email or ID number');

    const patient = await prisma.patient.findMany({
      where: {
        clinicId: patientData.clinicId,
        OR: [
          {
            AND: [
              {
                email: patientData.email ? patientData.email : 'MISSING', //otherwise it was grabbing null fields
              },
              {
                surname: patientData.surname,
              },
            ],
          },
          {
            AND: [
              {
                nationalId: patientData.nationalId
                  ? patientData.nationalId
                  : 'MISSING',
              },
              {
                surname: patientData.surname,
              },
            ],
          },
        ],
      },
    });

    if (patient.length) throw new Error('Patient already exists!');

    return await prisma.patient.create({
      data: {
        name: patientData.name,
        surname: patientData.surname,
        email: patientData.email,
        nationalId: patientData.nationalId,
        clinic: {
          connect: {
            id: patientData.clinicId,
          },
        },
      },
    });
  }

  @Mutation(() => Patient)
  async deletePatient(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ): Promise<Patient> {
    return await prisma.patient.delete({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Patient)
  async updatePatient(
    @Arg('id', () => Int) id: number,
    @Arg('patientData') patientData: UpdatePatientInput,
    @Ctx() { prisma }: Context
  ): Promise<Patient> {
    const patient = await prisma.patient.findUnique({
      where: {
        id,
      },
    });

    if (!patient) throw new Error('Patient Not Found');

    return await prisma.patient.update({
      where: {
        id,
      },
      data: {
        ...patientData,
      },
    });
  }

  @FieldResolver()
  async dentist(
    @Root() patient: Patient,
    @Ctx() { prisma }: Context
  ): Promise<Dentist | null> {
    return await prisma.patient
      .findUnique({
        where: {
          id: patient.id,
        },
      })
      .dentist();
  }

  @FieldResolver()
  async appointments(@Root() patient: Patient, @Ctx() { prisma }: Context) {
    return await prisma.patient
      .findUnique({
        where: {
          id: patient.id,
        },
      })
      .appointments();
  }
}
