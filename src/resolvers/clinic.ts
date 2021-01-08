import 'reflect-metadata';
import { Context } from '../context';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Admin } from '../typeDefs/Admin';
import { Dentist } from '../typeDefs/Dentist';
import { Clinic } from '../typeDefs/Clinic';
import { Patient } from 'src/typeDefs/Patient';
import { Assistant } from 'src/typeDefs/Assistant';

@Resolver(Clinic)
export class ClinicResolver {
  @Query(() => Clinic)
  async clinic(@Arg('id') id: number, @Ctx() { prisma }: Context) {
    return await prisma.clinic.findUnique({
      where: {
        id,
      },
    });
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
  async dentists(@Root() clinic: Clinic, @Ctx() { prisma }: Context): Promise<Dentist[]> {
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
