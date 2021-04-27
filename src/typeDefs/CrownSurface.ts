import { Field, ID, ObjectType } from 'type-graphql';
import { SurfaceFill } from './SurfaceFill';
import { Tooth } from './Tooth';

@ObjectType()
export class CrownSurface {
  @Field(() => ID)
  id: string;

  @Field(() => Tooth)
  tooth: Tooth;

  @Field(() => SurfaceFill, { nullable: true })
  buccal: SurfaceFill;

  @Field(() => SurfaceFill, { nullable: true })
  mesial: SurfaceFill;

  @Field(() => SurfaceFill, { nullable: true })
  distal: SurfaceFill;

  @Field(() => SurfaceFill, { nullable: true })
  lingual: SurfaceFill;

  @Field(() => SurfaceFill, { nullable: true })
  occlusial: SurfaceFill;
}
