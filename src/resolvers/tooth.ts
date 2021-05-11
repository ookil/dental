import { Context } from '../index';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Length } from 'class-validator';
import { Tooth, ToothInput } from '../typeDefs/Tooth';

@InputType({ description: 'Upsert tooth data' })
export class TeethDiagramInput {
  @Field(() => ID)
  patientId: string;

  @Field(() => [ToothInput])
  teeth: ToothInput[];
}

// @InputType({ description: 'Delete tooth data' })
// export class DeleteTeethInput implements Partial<Teeth> {
//   @Field(() => Int)
//   patientId: number;

//   @Field()
//   @Length(2, 3)
//   id: string;

//   @Field(() => ToothSurface)
//   surface: ToothSurface;
// }

// @InputType({ description: 'Update tooth data' })
// export class UpdateTeethInput implements Partial<Teeth> {
//   @Field(() => Int)
//   patientId: number;

//   @Field()
//   @Length(2, 3)
//   id: string;

//   @Field(() => ToothSurface)
//   surface?: ToothSurface;

//   @Field(() => Treatment)
//   @Length(3, 100)
//   description?: Treatment;

//   @Field()
//   createdAt: Date;
// }

@Resolver(Tooth)
export class TeethResolver {
  @Authorized()
  @Query(() => Tooth, { nullable: true })
  async tooth(
    @Arg('patientId', () => ID) patientId: string,
    @Arg('toothId') toothId: string,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.tooth.findUnique({
      where: {
        patientId_position: {
          patientId: parseInt(patientId),
          position: toothId,
        },
      },
    });
  }

  @Authorized()
  @Query(() => [Tooth], { nullable: true })
  async patientTeeth(
    @Arg('patientId', () => ID) patientId: string,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.tooth.findMany({
      where: {
        patientId: parseInt(patientId),
      },
    });
  }

  @Authorized()
  @Mutation(() => [Tooth])
  async createToothDiagram(
    @Arg('createToothTreatmentData')
    ToothDiagramData: TeethDiagramInput,
    @Ctx() { prisma }: Context
  ) {
    // each tooth should only show up once in a database since this will be responsible
    // for displaying teeth diagram, so when the same tooth+surface were to be created
    // instead it's gonna update it

    const { teeth } = ToothDiagramData;

    const patientId = parseInt(ToothDiagramData.patientId);

    let mutatedTeeth: unknown[] = [];

    for (let i = 0; i < teeth.length; i++) {
      const tooth = teeth[i];

      const {
        buccalActionId,
        distalActionId,
        lingualActionId,
        mesialActionId,
        occlusialActionId,
        rootOneActionId,
        rootTwoActionId,
        rootThreeActionId,
      } = tooth;

      const where = tooth.id
        ? { id: parseInt(tooth.id) }
        : {
            patientId_position: {
              patientId,
              position: tooth.position,
            },
          };

      const buccalCreate = {
        create: {
          action: {
            connect: {
              id: buccalActionId!,
            },
          },
        },
      };

      const mesialCreate = {
        create: {
          action: {
            connect: {
              id: mesialActionId!,
            },
          },
        },
      };

      const distalCreate = {
        create: {
          action: {
            connect: {
              id: distalActionId!,
            },
          },
        },
      };

      const lingualCreate = {
        create: {
          action: {
            connect: {
              id: lingualActionId!,
            },
          },
        },
      };

      const occlusialCreate = {
        create: {
          action: {
            connect: {
              id: occlusialActionId!,
            },
          },
        },
      };

      const bucalUpdate = buccalActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: buccalActionId },
                },
              },
              ...buccalCreate,
            },
          }
        : {};

      const mesialUpdate = mesialActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: mesialActionId },
                },
              },
              ...mesialCreate,
            },
          }
        : {};

      const distalUpdate = distalActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: distalActionId },
                },
              },
              ...distalCreate,
            },
          }
        : {};

      const lingualUpdate = lingualActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: lingualActionId },
                },
              },
              ...lingualCreate,
            },
          }
        : {};

      const occlusialUpdate = occlusialActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: occlusialActionId },
                },
              },
              ...occlusialCreate,
            },
          }
        : {};

      const rootOneCreate = {
        create: {
          action: {
            connect: {
              id: rootOneActionId!,
            },
          },
        },
      };

      const rootOneUpdate = rootOneActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: rootOneActionId },
                },
              },
              ...rootOneCreate,
            },
          }
        : {};

      const rootTwoCreate = {
        create: {
          action: {
            connect: {
              id: rootTwoActionId!,
            },
          },
        },
      };

      const rootTwoUpdate = rootTwoActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: rootTwoActionId },
                },
              },
              ...rootTwoCreate,
            },
          }
        : {};

      const rootThreeCreate = {
        create: {
          action: {
            connect: {
              id: rootThreeActionId!,
            },
          },
        },
      };

      const rootThreeUpdate = rootThreeActionId
        ? {
            upsert: {
              update: {
                action: {
                  connect: { id: rootThreeActionId },
                },
              },
              ...rootThreeCreate,
            },
          }
        : {};

      const res = await prisma.tooth.upsert({
        where,
        update: {
          crown: {
            update: {
              buccal: bucalUpdate,
              mesial: mesialUpdate,
              distal: distalUpdate,
              lingual: lingualUpdate,
              occlusial: occlusialUpdate,
            },
          },
          root: {
            update: {
              rootOne: rootOneUpdate,
              rootTwo: rootTwoUpdate,
              rootThree: rootThreeUpdate,
            },
          },
        },
        create: {
          patient: {
            connect: {
              id: patientId,
            },
          },
          position: tooth.position,
          quadrant: tooth.quadrant,
          toothNumber: tooth.toothNumber,
          primary: tooth.primary,
          crown: {
            create: {
              buccal: buccalActionId ? buccalCreate : {},
              mesial: mesialActionId ? mesialCreate : {},
              distal: distalActionId ? distalCreate : {},
              lingual: lingualActionId ? lingualCreate : {},
              occlusial: occlusialActionId ? occlusialCreate : {},
            },
          },
          root: {
            create: {
              rootOne: rootOneActionId ? rootOneCreate : {},
              rootTwo: rootTwoActionId ? rootTwoCreate : {},
              rootThree: rootThreeActionId ? rootThreeCreate : {},
            },
          },
          createdAt: new Date(),
        },
      });

      mutatedTeeth.push(res);
    }

    return mutatedTeeth;
  }

  @FieldResolver()
  async crown(@Root() tooth: Tooth, @Ctx() { prisma }: Context) {
    return await prisma.tooth
      .findUnique({
        where: {
          id: parseInt(tooth.id),
        },
      })
      .crown();
  }

  @FieldResolver()
  async root(@Root() tooth: Tooth, @Ctx() { prisma }: Context) {
    return await prisma.tooth
      .findUnique({
        where: {
          id: parseInt(tooth.id),
        },
      })
      .root();
  }

  //   @Authorized()
  //   @Mutation(() => Teeth)
  //   async deleteToothTreatment(
  //     @Arg('toothData', () => DeleteTeethInput) toothData: DeleteTeethInput,
  //     @Ctx() { prisma }: Context
  //   ) {
  //     return await prisma.teeth.delete({
  //       where: {
  //         id_surface_patientId: {
  //           id: toothData.id,
  //           surface: toothData.surface,
  //           patientId: toothData.patientId,
  //         },
  //       },
  //     });
  //   }
}
