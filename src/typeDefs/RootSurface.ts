import { Field, ID, ObjectType } from 'type-graphql';
import { SurfaceFill } from './SurfaceFill';
import { Tooth } from './Tooth';

@ObjectType()
export class RootSurface {
  @Field(() => ID)
  id: string;

  @Field(() => Tooth)
  tooth: Tooth;

  @Field(() => SurfaceFill, { nullable: true })
  rootOne: SurfaceFill;

  @Field(() => SurfaceFill, { nullable: true })
  rootTwo: SurfaceFill;

  @Field(() => SurfaceFill, { nullable: true })
  rootThree: SurfaceFill;
}
