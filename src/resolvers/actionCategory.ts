import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { ActionCategory, SurfaceAction } from '../typeDefs/SurfaceAction';
import { Context } from '../index';

@Resolver(ActionCategory)
export class ActionCategoryResolver {
  @FieldResolver(() => [SurfaceAction])
  async actions(@Root() category: ActionCategory, @Ctx() { prisma }: Context) {
    return await prisma.actionCategory
      .findUnique({
        where: {
          id: parseInt(category.id),
        },
      })
      .actions();
  }
}
