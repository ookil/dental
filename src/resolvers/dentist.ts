import { Context } from '../context';
import { Dentist } from '../typeDefs/Dentist';
import { Patient } from '../typeDefs/Patient';
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
import { genSalt, hash } from 'bcrypt';

@InputType({ description: 'New dentist data' })
export class CreateDentistInput implements Partial<Dentist> {
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

  @Field(() => Int)
  clinicId: number;
}

@InputType({ description: 'New dentist data' })
export class UpdateDentistInput implements Partial<Dentist> {
  @Field({ nullable: true })
  @Length(3, 10)
  name?: string;

  @Field({ nullable: true })
  @Length(3, 10)
  surname?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Length(6, 20)
  password?: string;
}

@Resolver(Dentist)
export class DentistResolver {
  @Query(() => Dentist, { nullable: true })
  async dentist(@Arg('id', () => Int) id: number, @Ctx() { prisma }: Context) {
    return await prisma.dentist.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Dentist)
  async createDentist(
    @Arg('dentistData') dentistData: CreateDentistInput,
    @Ctx() { prisma }: Context
  ): Promise<Dentist> {
    const dentist = await prisma.dentist.findMany({
      where: {
        AND: [
          {
            email: dentistData.email,
          },
          {
            clinicId: dentistData.clinicId,
          },
        ],
      },
    });

    console.log(dentist.length);

    if (dentist.length) throw new Error('Dentist already exists!');

    const salt = await genSalt(10);

    return await prisma.dentist.create({
      data: {
        name: dentistData.name,
        surname: dentistData.surname,
        email: dentistData.email,
        password: await hash(dentistData.password, salt),
        clinic: {
          connect: {
            id: dentistData.clinicId,
          },
        },
      },
    });
  }

  @Mutation(() => Dentist)
  async deleteDentist(
    @Arg('id', () => Int) id: number,
    @Ctx() { prisma }: Context
  ): Promise<Dentist> {
    return await prisma.dentist.delete({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Dentist)
  async updateDentist(
    @Arg('id', () => Int) id: number,
    @Arg('dentistData') dentistData: UpdateDentistInput,
    @Ctx() { prisma }: Context
  ): Promise<Dentist> {
    const dentist = await prisma.dentist.findUnique({
      where: {
        id,
      },
    });

    if (!dentist) throw new Error('Dentist Not Found');

    const salt = await genSalt(10);

    if (dentistData.password)
      dentistData.password = await hash(dentistData.password, salt);

    return await prisma.dentist.update({
      where: {
        id,
      },
      data: {
        ...dentistData,
      },
    });
  }

  @FieldResolver()
  async patients(
    @Root() dentist: Dentist,
    @Ctx() { prisma }: Context
  ): Promise<Patient[]> {
    return await prisma.dentist
      .findUnique({
        where: {
          id: dentist.id,
        },
      })
      .patients();
  }

  @FieldResolver()
  async appointments(@Root() dentist: Dentist, @Ctx() { prisma }: Context) {
    const appointments = await prisma.dentist
      .findUnique({
        where: {
          id: dentist.id,
        },
      })
      .appointments();

    return appointments;
  }
}
