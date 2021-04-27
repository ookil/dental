import { SurfaceFill } from '../typeDefs/SurfaceFill';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { SurfaceAction } from '../typeDefs/SurfaceAction';
import { Context } from '../index';

@Resolver(SurfaceFill)
export class SurfaceFillResolver {
  @FieldResolver(() => SurfaceAction)
  async action(@Root() surface: SurfaceFill, @Ctx() { prisma }: Context) {
    return await prisma.surfaceFill
      .findUnique({
        where: {
          id: parseInt(surface.id),
        },
      })
      .action();
  }
}
