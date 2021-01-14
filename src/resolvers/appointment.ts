import { Context } from '../index';
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

import { Patient } from '../typeDefs/Patient';
import { Appointment, AppointmentStatus } from '../typeDefs/Appointment';
import { Length } from 'class-validator';
import { CreatePatientInput } from './patient';

@InputType({ description: 'New appointment data' })
export class CreateAppointmentInput implements Partial<Appointment> {
  @Field()
  treatment: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field(() => Int)
  patientId: number;

  @Field(() => Int)
  dentistId: number;
}

@InputType({ description: 'Update appointment data' })
export class UpdateAppointmentInput implements Partial<Appointment> {
  @Field({ nullable: true })
  @Length(1, 30)
  treatment?: string;

  @Field({ nullable: true })
  @Length(1, 30)
  startAt?: Date;

  @Field({ nullable: true })
  @Length(1, 30)
  endAt?: Date;

  @Field(() => AppointmentStatus, { nullable: true })
  status?: AppointmentStatus;

  @Field(() => Int, { nullable: true })
  patientId?: number;

  @Field(() => Int, { nullable: true })
  dentistId?: number;
}

@Resolver(Appointment)
export class AppointmentResolver {
  @Query(() => Appointment, { nullable: true })
  async appointment(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.appointment.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => [Appointment], { nullable: true })
  async patientAppointments(
    @Arg('patientId', () => Int) patientId: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.appointment.findMany({
      where: {
        patientId,
      },
    });
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Arg('appointmentData') appointmentData: CreateAppointmentInput,
    @Arg('newPatientData', { nullable: true })
    newPatientData: CreatePatientInput,
    @Ctx() { prisma }: Context
  ) {
    const appointment = await prisma.appointment.findMany({
      where: {
        AND: [
          {
            startAt: appointmentData.startAt,
          },
          {
            endAt: appointmentData.endAt,
          },
          {
            dentistId: appointmentData.dentistId,
          },
        ],
      },
    });

    // don't allow to create multiple appointments for dentist at the same time
    if (appointment.length)
      throw new Error('Something went wrong, appointment alredy exists!');

    return await prisma.appointment.create({
      data: {
        treatment: appointmentData.treatment,
        startAt: appointmentData.startAt,
        endAt: appointmentData.endAt,
        createdAt: new Date(),
        dentist: {
          connect: { id: appointmentData.dentistId },
        },
        patient: {
          connectOrCreate: {
            where: {
              id: appointmentData.patientId,
            },
            create: {
              name: newPatientData.name,
              surname: newPatientData.surname,
              email: newPatientData.email,
              nationalId: newPatientData.nationalId,
              clinic: {
                connect: {
                  id: newPatientData.clinicId,
                },
              },
            },
          },
        },
        status: 'REGISTERED',
      },
    });
  }

  @Mutation(() => Appointment)
  async deleteAppointment(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.appointment.delete({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Arg('id', () => Int) id: number,
    @Arg('appointmentData') appointmentData: UpdateAppointmentInput,
    @Ctx() { prisma }: Context
  ) {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) throw new Error('Appointment Not Found');

    return await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...appointmentData,
      },
    });
  }

  @FieldResolver()
  async dentist(@Root() appointment: Appointment, @Ctx() { prisma }: Context) {
    return await prisma.appointment
      .findUnique({
        where: {
          id: appointment.id,
        },
      })
      .dentist();
  }

  @FieldResolver()
  async patient(
    @Root() appointment: Appointment,
    @Ctx() { prisma }: Context
  ): Promise<Patient | null> {
    return await prisma.appointment
      .findUnique({
        where: {
          id: appointment.id,
        },
      })
      .patient();
  }
}
