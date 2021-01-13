import { Length } from 'class-validator';
import { Context } from 'src/context';
import { Treatment, TreatmentCategory } from '../typeDefs/Treatment';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';

@InputType()
export class AddTreatmentInput implements Partial<Treatment> {
  @Field()
  @Length(1, 50)
  name: string;

  @Field()
  @Length(1, 100)
  description: string;

  @Field(() => TreatmentCategory)
  category: TreatmentCategory;
}

@Resolver(Treatment)
export class TreatmentResolver {
  @Query(() => [Treatment])
  async treatments(
    @Arg('category', () => TreatmentCategory, { nullable: true })
    category: TreatmentCategory,
    @Ctx() { prisma }: Context
  ) {
    if (category)
      return await prisma.treatment.findMany({
        where: {
          category,
        },
      });

    return await prisma.treatment.findMany();
  }

  @Mutation(() => Treatment)
  async addTreatment(
    @Arg('treatmentData', () => AddTreatmentInput)
    treatmentData: AddTreatmentInput,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.treatment.create({
      data: {
        name: treatmentData.name,
        description: treatmentData.description,
        category: treatmentData.category,
      },
    });
  }
}
