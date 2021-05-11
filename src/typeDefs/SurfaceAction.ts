import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Clinic } from './Clinic';

@ObjectType()
export class ActionCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [SurfaceAction])
  actions: SurfaceAction[];

  @Field(() => Clinic)
  clinic: Clinic;
}

@ObjectType()
export class SurfaceAction {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ActionType)
  type: ActionType;

  @Field(() => [ActionCategory])
  categories: ActionCategory[];

  @Field()
  fillColor: string;

  @Field(() => Icon, { nullable: true })
  icon: Icon | null;

  @Field()
  rootAction: boolean;

  @Field()
  crownAction: boolean;

  @Field(() => Clinic)
  clinic: Clinic;
}

@ObjectType()
export class Icon {
  @Field(() => ID)
  id: string;

  @Field()
  alt: string;
}

export enum ActionType {
  DIAGNOSTIC = 'DIAGNOSTIC',
  PROCEDURE = 'PROCEDURE',
}

registerEnumType(ActionType, { name: 'ActionType' });
