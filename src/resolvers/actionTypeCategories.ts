import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { ActionCategory } from '../typeDefs/SurfaceAction';
import { Context } from '../index';
import { ActionTypeCategories } from '../typeDefs/ActionTypeCategories';

@Resolver(ActionTypeCategories)
export class ActionTypeCategoryResolver {
  @Authorized()
  @Query(() => ActionTypeCategories)
  async diagramCategories(
    @Arg('clinicId', () => ID) clinicId: string,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.actionTypeCategories.findFirst({
      where: {
        clinicId: parseInt(clinicId),
      },
    });
  }

  @FieldResolver(() => [ActionCategory])
  async diagnostic(
    @Root() category: ActionTypeCategories,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.actionTypeCategories
      .findUnique({
        where: {
          id: parseInt(category.id),
        },
      })
      .diagnostic();
  }

  @FieldResolver(() => [ActionCategory])
  async procedures(
    @Root() category: ActionTypeCategories,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.actionTypeCategories
      .findUnique({
        where: {
          id: parseInt(category.id),
        },
      })
      .procedures();
  }
}
