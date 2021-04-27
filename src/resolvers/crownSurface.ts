import { CrownSurface } from '../typeDefs/CrownSurface';
import { SurfaceFill } from '../typeDefs/SurfaceFill';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Context } from 'vm';

@Resolver(CrownSurface)
export class CrownResolver {
  @FieldResolver(() => SurfaceFill)
  async buccal(@Root() crown: CrownSurface, @Ctx() { prisma }: Context) {
    return await prisma.crownSurface
      .findUnique({
        where: {
          id: parseInt(crown.id),
        },
      })
      .buccal();
  }

  @FieldResolver(() => SurfaceFill)
  async distal(@Root() crown: CrownSurface, @Ctx() { prisma }: Context) {
    return await prisma.crownSurface
      .findUnique({
        where: {
          id: parseInt(crown.id),
        },
      })
      .distal();
  }

  @FieldResolver(() => SurfaceFill)
  async mesial(@Root() crown: CrownSurface, @Ctx() { prisma }: Context) {
    return await prisma.crownSurface
      .findUnique({
        where: {
          id: parseInt(crown.id),
        },
      })
      .mesial();
  }

  @FieldResolver(() => SurfaceFill)
  async lingual(@Root() crown: CrownSurface, @Ctx() { prisma }: Context) {
    return await prisma.crownSurface
      .findUnique({
        where: {
          id: parseInt(crown.id),
        },
      })
      .lingual();
  }

  @FieldResolver(() => SurfaceFill)
  async occlusial(@Root() crown: CrownSurface, @Ctx() { prisma }: Context) {
    return await prisma.crownSurface
      .findUnique({
        where: {
          id: parseInt(crown.id),
        },
      })
      .occlusial();
  }
}
