import { Context } from '../index';
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

import { Patient } from '../typeDefs/Patient';
import {
  Appointment,
  AppointmentStatus,
  WeeklyAppointments,
} from '../typeDefs/Appointment';
import { Length } from 'class-validator';
import { CreatePatientInput } from './patient';
import { addMinutes, isBefore, setHours, setMinutes } from 'date-fns';
import {
  DEAFULT_WORK_ON_SUNDAY,
  DEFAULT_APPOINTMENT_DURATION,
  DEFAULT_WORK_END_HOUR,
  DEFAULT_WORK_END_MINUTES,
  DEFAULT_WORK_START_HOUR,
  DEFAULT_WORK_START_MINUTES,
} from '../utils/defaults';
import { prisma } from '../context';

@InputType({ description: 'New appointment data' })
export class CreateAppointmentInput implements Partial<Appointment> {
  @Field()
  treatment: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field(() => ID)
  patientId: number | string;

  @Field(() => ID)
  dentistId: number | string;

  @Field(() => ID)
  clinicId: number | string;
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

  @Field(() => ID, { nullable: true })
  patientId?: number | string;

  @Field(() => ID, { nullable: true })
  dentistId?: number | string;
}

@InputType({ description: 'Clinic options' })
export class ClinicAppointmentsOptions {
  @Field(() => Int, { nullable: true })
  workStartHour?: number;

  @Field(() => Int, { nullable: true })
  workStartMinutes?: number;

  @Field(() => Int, { nullable: true })
  workEndHour?: number;

  @Field(() => Int, { nullable: true })
  workEndMinutes?: number;

  @Field()
  workOnSaturday?: boolean;

  @Field()
  workOnSunday?: boolean;

  @Field(() => Int, { nullable: true })
  appointmentDuration?: number;
}

@InputType({ description: 'New selected week' })
export class WeeklyAppointmentsInput {
  @Field(() => [Date])
  days: Date[];

  @Field(() => ID)
  clinicId: string | number;

  @Field(() => ID)
  dentistId: string | number;

  @Field(() => ClinicAppointmentsOptions, { nullable: true })
  options?: ClinicAppointmentsOptions;
}

@Resolver(Appointment)
export class AppointmentResolver {
  @Authorized()
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

  @Authorized()
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

  @Authorized()
  @Mutation(() => Appointment)
  async createAppointment(
    @Arg('appointmentData') appointmentData: CreateAppointmentInput,
    @Arg('newPatientData', { nullable: true })
    newPatientData: CreatePatientInput,
    @Ctx() { prisma }: Context
  ) {
    if (typeof appointmentData.dentistId === 'string')
      appointmentData.dentistId = parseInt(appointmentData.dentistId);

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
      throw new Error('Something went wrong, appointment already exists!');

    if (typeof appointmentData.clinicId === 'string')
      appointmentData.clinicId = parseInt(appointmentData.clinicId);

    if (typeof appointmentData.patientId === 'string')
      appointmentData.patientId = parseInt(appointmentData.patientId);

    if (newPatientData) {
      if (typeof newPatientData.clinicId === 'string')
        newPatientData.clinicId = parseInt(newPatientData.clinicId);

      if (typeof newPatientData.dentistId === 'string')
        newPatientData.dentistId = parseInt(newPatientData.dentistId);

      return await prisma.appointment.create({
        data: {
          treatment: appointmentData.treatment,
          startAt: appointmentData.startAt,
          endAt: appointmentData.endAt,
          createdAt: new Date(),
          clinic: {
            connect: {
              id: appointmentData.clinicId,
            },
          },
          dentist: {
            connect: { id: appointmentData.dentistId },
          },
          patient: {
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
              dentist: {
                connect: {
                  id: newPatientData.dentistId,
                },
              },
            },
          },
          status: 'REGISTERED',
        },
        include: {
          patient: true,
          dentist: true,
        },
      });
    }

    return await prisma.appointment.create({
      data: {
        treatment: appointmentData.treatment,
        startAt: appointmentData.startAt,
        endAt: appointmentData.endAt,
        createdAt: new Date(),
        clinic: {
          connect: {
            id: appointmentData.clinicId,
          },
        },
        dentist: {
          connect: { id: appointmentData.dentistId },
        },
        patient: {
          connect: {
            id: appointmentData.patientId,
          },
        },
        status: 'REGISTERED',
      },
      include: {
        patient: true,
        dentist: true,
      },
    });
  }

  @Authorized()
  @Mutation(() => Appointment)
  async deleteAppointment(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    return await prisma.appointment.delete({
      where: {
        id,
      },
    });
  }

  @Authorized()
  @Query(() => [WeeklyAppointments])
  async weeklyAppointments(
    @Arg('weeklyAppointmentsData', () => WeeklyAppointmentsInput)
    data: WeeklyAppointmentsInput
  ) {
    const workStartHour =
      data.options?.workStartHour || DEFAULT_WORK_START_HOUR;
    const workStartMinutes =
      data.options?.workStartMinutes || DEFAULT_WORK_START_MINUTES;

    const workEndHour = data.options?.workEndHour || DEFAULT_WORK_END_HOUR;
    const workEndMinutes =
      data.options?.workEndMinutes || DEFAULT_WORK_END_MINUTES;

    const appointmentDuration =
      data.options?.appointmentDuration || DEFAULT_APPOINTMENT_DURATION;

    const workOnSunday = data.options?.workOnSunday || DEAFULT_WORK_ON_SUNDAY;
    const workOnSaturday =
      data.options?.workOnSaturday || DEAFULT_WORK_ON_SUNDAY;

    // skip saturday and or sunday
    if (workOnSaturday && workOnSunday === false) {
      data.days = data.days.slice(0, 6);
    } else if (workOnSunday && workOnSaturday === false) {
      data.days = data.days.splice(5, 1);
    } else if (workOnSaturday === false && workOnSunday === false) {
      data.days = data.days.slice(0, 5);
    }

    if (typeof data.dentistId === 'string')
      data.dentistId = parseInt(data.dentistId);

    // already made appointments for selected week
    const dentistNotAvailable = await prisma.appointment.findMany({
      where: {
        AND: [
          {
            dentistId: data.dentistId,
          },
          {
            startAt: {
              gte: data.days[0],
            },
          },
          {
            endAt: {
              lte: data.days[data.days.length],
            },
          },
        ],
      },
    });

    let results: WeeklyAppointments[] = [];

    for (const day of data.days) {
      const start = setMinutes(setHours(day, workStartHour), workStartMinutes);
      const end = setMinutes(setHours(day, workEndHour), workEndMinutes);

      let appointments = [start];

      function addAppointmentDuration(
        hourStart: Date,
        hourEnd: Date,
        durration: number
      ) {
        const nextAppointment = addMinutes(hourStart, durration);

        if (isBefore(nextAppointment, hourEnd)) {
          appointments.push(nextAppointment);
          addAppointmentDuration(nextAppointment, hourEnd, durration);
        }
      }

      addAppointmentDuration(start, end, appointmentDuration);

      //when comparing Date objects getTime method is needed
      const free = appointments.filter(
        (date1) =>
          !dentistNotAvailable.some(
            ({ startAt: date2 }) => date1.getTime() === date2.getTime()
          )
      );

      results.push({
        date: start,
        appointments: [...free],
      });
    }

    return results;
  }

  @Authorized()
  @Mutation(() => Appointment)
  async updateAppointment(
    @Arg('id', () => ID) id: number | string,
    @Arg('appointmentData') appointmentData: UpdateAppointmentInput,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) throw new Error('Appointment Not Found');

    if (typeof appointmentData.dentistId === 'string')
      appointmentData.dentistId = parseInt(appointmentData.dentistId);

    const appointments = await prisma.appointment.findMany({
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
    if (appointments.length)
      throw new Error('Something went wrong, appointment alredy exists!');

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
