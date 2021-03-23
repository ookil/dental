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
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from 'type-graphql';

import { Patient } from '../typeDefs/Patient';
import {
  Appointment,
  AppointmentsList,
  AppointmentStatus,
  AppointmentSubscription,
  WeeklyAppointments,
} from '../typeDefs/Appointment';
import { CreatePatientInput } from './patient';
import {
  addMinutes,
  areIntervalsOverlapping,
  isBefore,
  set,
  setHours,
  setMinutes,
} from 'date-fns';
import { prisma } from '../context';
import { AppointmentPayload } from 'src/subsciptions/appointments.types';
import { APPOINTMENTS, APPOINTMENTS_DELETED } from '../utils/defaults';

@InputType({ description: 'New appointment data' })
export class CreateAppointmentInput implements Partial<Appointment> {
  @Field()
  treatment: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field(() => AppointmentStatus, { nullable: true })
  status?: AppointmentStatus;

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
  treatment: string;

  @Field({ nullable: true })
  startAt: Date;

  @Field({ nullable: true })
  endAt: Date;

  @Field(() => AppointmentStatus, { nullable: true })
  status: AppointmentStatus;

  @Field(() => ID, { nullable: true })
  patientId: number | string;

  @Field(() => ID, { nullable: true })
  dentistId: number | string;

  @Field(() => ID, { nullable: true })
  clinicId: number | string;
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

  @Field()
  currentDate: Date;

  @Field(() => ClinicAppointmentsOptions, { nullable: true })
  options?: ClinicAppointmentsOptions;
}

@InputType({ description: 'Variables for appointments list' })
export class AppointmentsListInput {
  @Field(() => ID)
  clinicId: string | number;

  @Field(() => ID)
  dentistId: string | number;

  @Field()
  date: Date;
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
    @PubSub() pubSub: PubSubEngine,
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

      const newAppointment = await prisma.appointment.create({
        data: {
          treatment: appointmentData.treatment,
          startAt: appointmentData.startAt,
          endAt: appointmentData.endAt,
          createdAt: new Date(),
          status: appointmentData.status || 'REGISTERED',
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
        },
      });

      const payload: AppointmentPayload = {
        mutation: 'ADDED',
        content: newAppointment,
      };

      await pubSub.publish(APPOINTMENTS, payload);

      return newAppointment;
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        treatment: appointmentData.treatment,
        startAt: appointmentData.startAt,
        endAt: appointmentData.endAt,
        createdAt: new Date(),
        status: appointmentData.status || 'REGISTERED',
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
      },
    });

    const payload: AppointmentPayload = {
      mutation: 'ADDED',
      content: {
        ...newAppointment,
      },
    };

    await pubSub.publish(APPOINTMENTS, payload);

    return newAppointment;
  }

  @Authorized()
  @Mutation(() => Appointment, { nullable: true })
  async deleteAppointment(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    if (typeof id === 'string') id = parseInt(id);

    const res = await prisma.appointment.delete({
      where: {
        id,
      },
    });

    const payload: AppointmentPayload = {
      mutation: 'DELETED',
      content: { ...res },
    };

    await pubSub.publish(APPOINTMENTS_DELETED, payload);

    return res;
  }

  @Authorized()
  @Query(() => [WeeklyAppointments])
  async weeklyAppointments(
    @Arg('weeklyAppointmentsData', () => WeeklyAppointmentsInput)
    data: WeeklyAppointmentsInput
  ) {
    if (typeof data.clinicId === 'string')
      data.clinicId = parseInt(data.clinicId);

    const clinic = await prisma.clinic.findUnique({
      where: {
        id: data.clinicId,
      },
      select: {
        settings: true,
      },
    });

    if (!clinic?.settings)
      throw new Error('Missing clinic settings, please try again.');

    const {
      appointmentDuration,
      workOnSaturday,
      workOnSunday,
      workStartHour,
      workEndHour,
      workStartMinutes,
      workEndMinutes,
    } = clinic.settings;

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

    function addAppointmentDuration(
      hourStart: Date,
      hourEnd: Date,
      durration: number,
      appointmentsArr: Date[]
    ) {
      const nextAppointment = addMinutes(hourStart, durration);

      if (isBefore(nextAppointment, hourEnd)) {
        appointmentsArr.push(nextAppointment);
        addAppointmentDuration(
          nextAppointment,
          hourEnd,
          durration,
          appointmentsArr
        );
      }
    }

    for (const day of data.days) {
      // don't create appointments slots for past days

      const start = setMinutes(setHours(day, workStartHour), workStartMinutes);
      const end = setMinutes(setHours(day, workEndHour), workEndMinutes);

      let appointments = [start];

      addAppointmentDuration(start, end, appointmentDuration, appointments);

      //when comparing Date objects getTime method is needed
      // filter out already created appointments
      const free = appointments.filter(
        (date1) =>
          !dentistNotAvailable.some(
            ({ startAt: date2 }) => date1.getTime() === date2.getTime()
          )
      );

      // filterout appointments hours before current hour
      const afterCurrentTime = free.filter((date) => date > data.currentDate);

      results.push({
        date: day,
        appointments: [...afterCurrentTime],
      });
    }
    // this is the only setup that work, whatever else I tried to filter out past dates was problematioc because of timezones
    return results;
  }

  @Authorized()
  @Query(() => [AppointmentsList])
  async appointmentsList(
    @Arg('searchData') searchData: AppointmentsListInput,
    @Ctx() { prisma }: Context
  ) {
    if (typeof searchData.clinicId === 'string')
      searchData.clinicId = parseInt(searchData.clinicId);

    if (typeof searchData.dentistId === 'string')
      searchData.dentistId = parseInt(searchData.dentistId);

    const settings = await prisma.clinicSettings.findFirst({
      where: {
        clinicId: searchData.clinicId,
      },
    });

    if (!settings) throw new Error('Missing clinic settings.');

    const { date, dentistId } = searchData;

    const {
      appointmentDuration,
      workStartHour,
      workStartMinutes,
      workEndHour,
      workEndMinutes,
    } = settings;

    const startTime = set(date, {
      hours: workStartHour,
      minutes: workStartMinutes,
      seconds: 0,
      milliseconds: 0,
    });
    const endTime = set(date, {
      hours: workEndHour,
      minutes: workEndMinutes,
      seconds: 0,
      milliseconds: 0,
    });

    const takenAppointments = await prisma.appointment.findMany({
      where: {
        AND: [
          {
            dentistId,
          },
          {
            startAt: {
              gte: startTime,
            },
          },
          {
            endAt: {
              lte: endTime,
            },
          },
        ],
      },
    });

    let appointments: AppointmentsList[] = [
      {
        startAt: startTime,
        endAt: setMinutes(startTime, appointmentDuration),
        working: true,
        busy: false,
      },
    ];

    function addAppointmentDuration(
      hourStart: Date,
      hourEnd: Date,
      durration: number,
      appointmentsArr: AppointmentsList[]
    ) {
      const nextAppointment = addMinutes(hourStart, durration);

      if (isBefore(nextAppointment, hourEnd)) {
        appointmentsArr.push({
          startAt: nextAppointment,
          endAt: addMinutes(nextAppointment, durration),
          working: true,
          busy: false,
        });
        addAppointmentDuration(
          nextAppointment,
          hourEnd,
          durration,
          appointmentsArr
        );
      }
    }

    addAppointmentDuration(
      startTime,
      endTime,
      appointmentDuration,
      appointments
    );

    const applyBusy = appointments.map((item) => {
      const { startAt, endAt } = item;
      const roundedStart = set(startAt, { seconds: 0, milliseconds: 0 });
      const roundedEnd = set(endAt, { seconds: 0, milliseconds: 0 });

      if (
        takenAppointments.some(({ startAt: start2, endAt: end2 }) => {
          const roundedStartTaken = set(start2, {
            seconds: 0,
            milliseconds: 0,
          });
          const roundedEndTaken = set(end2, { seconds: 0, milliseconds: 0 });

          return areIntervalsOverlapping(
            { start: roundedStart, end: roundedEnd },
            { start: roundedStartTaken, end: roundedEndTaken }
          );
        })
      )
        return { ...item, busy: true };
      else return item;
    });

    return applyBusy;
  }

  @Authorized()
  @Mutation(() => Appointment)
  async updateAppointment(
    @Arg('id', () => ID) id: number | string,
    @Arg('appointmentData') appointmentData: UpdateAppointmentInput,
    @Ctx() { prisma }: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    if (typeof id === 'string') id = parseInt(id);

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) throw new Error("Appointment doesn't exist");

    if (typeof appointmentData.dentistId === 'string')
      appointmentData.dentistId = parseInt(appointmentData.dentistId);

    if (typeof appointmentData.patientId === 'string')
      appointmentData.patientId = parseInt(appointmentData.patientId);

    if (typeof appointmentData.clinicId === 'string')
      appointmentData.clinicId = parseInt(appointmentData.clinicId);

    if (
      appointmentData.startAt &&
      appointmentData.endAt &&
      appointmentData.dentistId
    ) {
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
    }

    // this create in the end doesn't make sense I think but will come back to it
    /* if (!appointment || id === -1) {
      const newAppointment = await prisma.appointment.create({
        data: {
          treatment: appointmentData.treatment,
          startAt: appointmentData.startAt,
          endAt: appointmentData.endAt,
          createdAt: new Date(),
          status: appointmentData.status || 'REGISTERED',
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
        },
      });

      const payload: AppointmentPayload = {
        mutation: 'ADDED',
        content: newAppointment,
      };

      pubSub.publish(APPOINTMENTS, payload);

      return newAppointment;
    } */

    const updated = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        treatment: appointmentData.treatment,
        createdAt: new Date(),
        startAt: appointmentData.startAt,
        endAt: appointmentData.endAt,
        status: appointmentData.status,
        patient: {
          connect: {
            id: appointmentData.patientId || appointment.patientId,
          },
        },
        dentist: {
          connect: {
            id: appointmentData.dentistId || appointment.dentistId,
          },
        },
        clinic: {
          connect: {
            id: appointmentData.clinicId || appointment.clinicId,
          },
        },
      },
    });

    const payload: AppointmentPayload = {
      mutation: 'UPDATED',
      content: updated,
    };

    pubSub.publish(APPOINTMENTS, payload);

    return updated;
  }

  @Authorized()
  @Subscription(() => AppointmentSubscription, {
    topics: [APPOINTMENTS_DELETED],
    filter: ({ payload, args }: ResolverFilterData<AppointmentPayload>) => {
      return payload.content.clinicId === parseInt(args.clinicId);
    },
  })
  appointmentsDeleteSub(
    @Root() appointmentPayload: AppointmentPayload,
    @Arg('clinicId', () => ID) _clinicId: string | number
  ): AppointmentSubscription {
    return {
      mutation: appointmentPayload.mutation,
      content: appointmentPayload.content,
    };
  }

  @Authorized()
  @Subscription(() => AppointmentSubscription, {
    topics: [APPOINTMENTS],
    filter: ({ payload, args }: ResolverFilterData<AppointmentPayload>) => {
      return payload.content.clinicId === parseInt(args.clinicId);
    },
  })
  appointmentsSubscription(
    @Root() appointmentPayload: AppointmentPayload,
    @Arg('clinicId', () => ID) _clinicId: string | number
  ): AppointmentSubscription {
    return {
      mutation: appointmentPayload.mutation,
      content: appointmentPayload.content,
    };
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
