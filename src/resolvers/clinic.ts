import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { Context } from '../index';
import {
  Arg,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  InputType,
  Field,
  Mutation,
  Authorized,
  ID,
} from 'type-graphql';
import { Clinic } from '../typeDefs/Clinic';
import { Patient } from '../typeDefs/Patient';
import { Dentist } from '../typeDefs/Dentist';
import { User } from '../typeDefs/User';
import { IsEmail, Length } from 'class-validator';

@InputType({ description: 'New clinic data' })
export class CreateClinicInput implements Partial<Clinic> {
  //ensure I don't accidentally change the property type
  @Field()
  name: string;

  @Field()
  address: string;
}

@InputType({ description: 'New admin data' })
export class CreateAdminInput implements Partial<User> {
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
}

@Resolver(Clinic)
export class ClinicResolver {
  @Authorized()
  @Query(() => Clinic, { nullable: true })
  async clinic(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    return await prisma.clinic.findUnique({
      where: {
        id,
      },
    });
  }

  @Authorized()
  @Query(() => [Dentist], { nullable: true })
  async clinicDentists(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    return await prisma.dentist.findMany({
      where: {
        clinicId: id,
      },
    });
  }

  @Authorized()
  @Query(() => [Patient], { nullable: true })
  async clinicPatients(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    return await prisma.patient.findMany({
      where: {
        clinicId: id,
      },
    });
  }

  @Authorized()
  @Query(() => [Patient], { nullable: true })
  async clinicAppointments(
    @Arg('id', () => ID) id: number | string,
    @Ctx() { prisma }: Context
  ) {
    if (typeof id === 'string') id = parseInt(id);

    return await prisma.patient.findMany({
      where: {
        clinicId: id,
      },
    });
  }

  @Mutation(() => Clinic)
  async createClinic(
    @Arg('clinicData') clinicData: CreateClinicInput,
    @Arg('adminData') adminData: CreateAdminInput,
    @Ctx() { prisma }: Context
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (user) throw new Error('User already exists!');

    const salt = await bcrypt.genSalt(10);

    const clinic = await prisma.clinic.create({
      data: {
        name: clinicData.name,
        address: clinicData.address,
        admin: {
          create: {
            email: adminData.email,
            password: await bcrypt.hash(adminData.password, salt),
            roles: ['ADMIN'],
          },
        },
      },
      include: {
        admin: true,
      },
    });

    await prisma.userInClinic.create({
      data: {
        clinic: { connect: { id: clinic.id } },
        user: { connect: { id: clinic.admin.id } },
      },
    });

    return clinic;
  }

  @FieldResolver()
  async admin(@Root() clinic: Clinic, @Ctx() { prisma }: Context) {
    return await prisma.clinic
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .admin();
  }

  @FieldResolver()
  async dentists(@Root() clinic: Clinic, @Ctx() { prisma }: Context) {
    return await prisma.clinic
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .dentists();
  }

  @FieldResolver()
  async assistants(@Root() clinic: Clinic, @Ctx() { prisma }: Context) {
    return await prisma.clinic
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .assistants();
  }

  @FieldResolver()
  async patients(
    @Root() clinic: Clinic,
    @Ctx() { prisma }: Context
  ): Promise<Patient[]> {
    return await prisma.clinic
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .patients();
  }

  @FieldResolver()
  async users(@Root() clinic: Clinic, @Ctx() { prisma }: Context) {
    const usersOnClinic = await prisma.userInClinic.findMany({
      where: {
        clinicId: clinic.id,
      },
      select: {
        user: true,
      },
    });

    const users = usersOnClinic.map((item) => item.user);

    return users;
  }

  @FieldResolver()
  async settings(@Root() clinic: Clinic, @Ctx() { prisma }: Context) {
    return await prisma.clinic
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .settings();
  }
}
