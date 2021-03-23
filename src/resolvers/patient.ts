import { Context } from '../context';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Length, IsEmail } from 'class-validator';
import { Patient, Sort } from '../typeDefs/Patient';

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

  @Field(() => ID)
  clinicId: number | string;

  @Field(() => ID)
  dentistId: number | string;
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

@InputType({ description: 'Sorting patients' })
class PatientsOrderBy {
  @Field({ nullable: true })
  name?: Sort;

  @Field({ nullable: true })
  surname?: Sort;

  @Field({ nullable: true })
  bday?: Sort;

  @Field({ nullable: true })
  appointments?: Sort;
}

@InputType({ description: 'Get paginnated & sorted patients' })
export class GetPatientsInput {
  @Field(() => ID)
  clinicId: string;

  @Field()
  pageSize: number;

  @Field()
  currentPage: number;

  @Field()
  orderBy: PatientsOrderBy;
}

@Resolver(Patient)
export class PatientResolver {
  @Authorized()
  @Query(() => Patient, { nullable: true })
  async patient(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    const res = await prisma.patient.findUnique({
      where: {
        id,
      },
      include: {
        appointments: {
          orderBy: {
            endAt: 'desc',
          },
        },
      },
    });

    return res;
  }

  @Authorized()
  @Query(() => [Patient])
  async getOffsetPatients(
    @Arg('patientsVar')
    { clinicId, pageSize, currentPage, orderBy }: GetPatientsInput,
    @Ctx() { prisma }: Context
  ) {
    const sorting = orderBy.appointments ? {} : orderBy;

    const allPatients = await prisma.patient.findMany({
      where: {
        clinicId: parseInt(clinicId),
      },
      orderBy: sorting,
      include: {
        appointments: {
          orderBy: {
            endAt: 'desc',
          },
          take: 1,
        },
      },
      skip: currentPage * pageSize,
      take: pageSize
    });
    
    return allPatients
  }

  /* @Authorized()
  @Query(() => PatientsConnection)
  async getPatients(
    @Arg('patientsVar')
    { clinicId, pageSize, after, orderBy }: GetPatientsInput,
    @Ctx() { prisma }: Context
  ) {
    const sorting = orderBy.appointments ? {} : orderBy;

    const allPatients = await prisma.patient.findMany({
      where: {
        clinicId: parseInt(clinicId),
      },
      orderBy: sorting,
      include: {
        appointments: {
          orderBy: {
            endAt: 'desc',
          },
          take: 1,
        },
      },
    });

    console.log(allPatients);

    const paginatedPatients = paginateResults({
      after,
      pageSize,
      results: allPatients,
    });

    return {
      cursor: paginatedPatients.length
        ? paginatedPatients[paginatedPatients.length - 1].id
        : null,
      hasMore: paginatedPatients.length
        ? paginatedPatients[paginatedPatients.length - 1].id !==
          allPatients[allPatients.length - 1].id
        : false,
      patients: paginatedPatients,
    };
  } */

  @Authorized()
  @Mutation(() => Patient)
  async createPatient(
    @Arg('patientData') patientData: CreatePatientInput,
    @Ctx() { prisma }: Context
  ): Promise<Patient> {
    if (patientData.email === undefined && patientData.nationalId === undefined)
      throw new Error('Please provide email or ID number');

    if (typeof patientData.clinicId === 'string')
      patientData.clinicId = parseInt(patientData.clinicId);

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

    if (typeof patientData.dentistId === 'string')
      patientData.dentistId = parseInt(patientData.dentistId);

    return await prisma.patient.create({
      data: {
        name: patientData.name,
        surname: patientData.surname,
        email: patientData.email,
        nationalId: patientData.nationalId,
        dentist: {
          connect: {
            id: patientData.dentistId,
          },
        },
        clinic: {
          connect: {
            id: patientData.clinicId,
          },
        },
      },
    });
  }

  @Authorized()
  @Mutation(() => Patient)
  async deletePatient(
    @Arg('id', () => ID) id: string | number,
    @Ctx() { prisma }: Context
  ): Promise<Patient> {
    if (typeof id === 'string') id = parseInt(id);

    return await prisma.patient.delete({
      where: {
        id,
      },
    });
  }

  @Authorized()
  @Mutation(() => Patient)
  async updatePatient(
    @Arg('id', () => ID) id: number | string,
    @Arg('patientData', { nullable: true }) patientData: UpdatePatientInput,
    @Arg('dentistId', () => Int, { nullable: true }) dentistId: number,
    @Ctx()
    { prisma }: Context
  ): Promise<Patient> {
    if (typeof id === 'string') id = parseInt(id);

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
        dentist: {
          connect: {
            id: dentistId,
          },
        },
      },
    });
  }

  @FieldResolver()
  async address(@Root() patient: Patient, @Ctx() { prisma }: Context) {
    return await prisma.patient
      .findUnique({
        where: {
          id: patient.id,
        },
      })
      .address();
  }

  @FieldResolver()
  async dentist(@Root() patient: Patient, @Ctx() { prisma }: Context) {
    return await prisma.patient
      .findUnique({
        where: {
          id: patient.id,
        },
      })
      .dentist();
  }

  /* @FieldResolver()
  async appointments(@Root() patient: Patient, @Ctx() { prisma }: Context) {
    return await prisma.patient
      .findUnique({
        where: {
          id: patient.id,
        },
      })
      .appointments();
  } */

  @FieldResolver()
  async patientChart(@Root() patient: Patient, @Ctx() { prisma }: Context) {
    return await prisma.patient
      .findUnique({
        where: {
          id: patient.id,
        },
      })
      .patientChart();
  }
}
