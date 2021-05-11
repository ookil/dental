import { Field, ID, ObjectType } from 'type-graphql';
import { SurfaceAction } from './SurfaceAction';

@ObjectType()
export class SurfaceFill {
  @Field(() => ID)
  id: string;

  @Field(() => SurfaceAction)
  action: SurfaceAction;
}
