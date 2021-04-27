import { Field, ID, ObjectType } from 'type-graphql';
import { SurfaceFill } from './SurfaceFill';
import { Tooth } from './Tooth';

@ObjectType()
export class RootSurface {
  @Field(() => ID)
  id: string;

  @Field(() => Tooth)
  tooth: Tooth;

  @Field(() => SurfaceFill)
  rootOne: SurfaceFill;

  @Field(() => SurfaceFill)
  rootTwo: SurfaceFill;

  @Field(() => SurfaceFill)
  rootThree: SurfaceFill;
}
