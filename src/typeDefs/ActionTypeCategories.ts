import { Field, ID, ObjectType } from 'type-graphql';
import { Clinic } from './Clinic';
import { ActionCategory } from './SurfaceAction';

@ObjectType()
export class ActionTypeCategories {
  @Field(() => ID)
  id: string;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field(() => [ActionCategory])
  diagnostic: ActionCategory[];

  @Field(() => [ActionCategory])
  procedures: ActionCategory[];

}
