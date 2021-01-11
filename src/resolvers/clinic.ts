import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { Context } from '../context';
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  InputType,
  Field,
  Mutation,
} from 'type-graphql';
import { Admin } from '../typeDefs/Admin';
import { Dentist } from '../typeDefs/Dentist';
import { Clinic } from '../typeDefs/Clinic';
import { Patient } from 'src/typeDefs/Patient';
import { Assistant } from 'src/typeDefs/Assistant';
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
export class CreateAdminInput implements Partial<Admin> {
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
  @Query(() => Clinic, { nullable: true })
  async clinic(@Arg('id', () => Int) id: number, @Ctx() { prisma }: Context) {
    return await prisma.clinic.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Clinic)
  async createClinic(
    @Arg('clinicData') clinicData: CreateClinicInput,
    @Arg('adminData') adminData: CreateAdminInput,
    @Ctx() { prisma }: Context
  ) {
    const admin = await prisma.admin.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (admin) throw new Error('User already exists!');

    const salt = await bcrypt.genSalt(10);

    const clinic = await prisma.clinic.create({
      data: {
        name: clinicData.name,
        address: clinicData.address,
        admin: {
          create: {
            name: adminData.name,
            surname: adminData.surname,
            email: adminData.email,
            password: await bcrypt.hash(adminData.password, salt),
          },
        },
      },
      include: {
        admin: true,
      },
    });
    return clinic;
  }

  @FieldResolver()
  async admin(
    @Root() clinic: Clinic,
    @Ctx() { prisma }: Context
  ): Promise<Admin | null> {
    return await prisma.clinic
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .admin();
  }

  @FieldResolver()
  async dentists(
    @Root() clinic: Clinic,
    @Ctx() { prisma }: Context
  ): Promise<Dentist[]> {
    return await prisma.clinic
      .findUnique({
        where: {
          id: clinic.id,
        },
      })
      .dentists();
  }

  @FieldResolver()
  async assistants(
    @Root() clinic: Clinic,
    @Ctx() { prisma }: Context
  ): Promise<Assistant[]> {
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
}
