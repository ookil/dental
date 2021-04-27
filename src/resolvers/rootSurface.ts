import { Context } from '../index';
import { RootSurface } from '../typeDefs/RootSurface';
import { SurfaceFill } from '../typeDefs/SurfaceFill';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(RootSurface)
export class RootResolver {
  @FieldResolver(() => SurfaceFill)
  async rootOne(@Root() root: RootSurface, @Ctx() { prisma }: Context) {
    return await prisma.rootSurface
      .findUnique({
        where: {
          id: parseInt(root.id),
        },
      })
      .rootOne();
  }

  @FieldResolver(() => SurfaceFill)
  async rootTwo(@Root() root: RootSurface, @Ctx() { prisma }: Context) {
    return await prisma.rootSurface
      .findUnique({
        where: {
          id: parseInt(root.id),
        },
      })
      .rootTwo();
  }

  @FieldResolver(() => SurfaceFill)
  async rootThree(@Root() root: RootSurface, @Ctx() { prisma }: Context) {
    return await prisma.rootSurface
      .findUnique({
        where: {
          id: parseInt(root.id),
        },
      })
      .rootThree();
  }
}
