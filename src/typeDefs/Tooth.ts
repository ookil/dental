import { Length } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { CrownSurface } from './CrownSurface';
import { Patient } from './Patient';
import { RootSurface } from './RootSurface';

@ObjectType()
export class Tooth {
  @Field(() => ID)
  id: string;

  @Field(() => Patient)
  patient: Patient;

  @Field()
  @Length(2, 3) // teeth naming (P)XY, P - primary, X - quadrants, Y - tooth
  position: string;

  @Field()
  primary: boolean;

  @Field(() => Int)
  quadrant: number;

  @Field(() => Int)
  toothNumber: number;

  @Field(() => CrownSurface, { nullable: true })
  crown?: CrownSurface;

  @Field(() => RootSurface, { nullable: true })
  root?: RootSurface;

  @Field()
  createdAt: Date;
}

@InputType()
export class ToothInput {
  @Field(() => ID, { nullable: true })
  id?: string | null;

  @Field()
  position: string;

  @Field(() => Int)
  quadrant: number;

  @Field(() => Int)
  toothNumber: number;

  @Field({ nullable: true })
  primary?: boolean;

  @Field(() => Int, { nullable: true })
  buccalActionId: number | null;

  @Field(() => Int, { nullable: true })
  mesialActionId: number | null;

  @Field(() => Int, { nullable: true })
  distalActionId: number | null;

  @Field(() => Int, { nullable: true })
  lingualActionId: number | null;

  @Field(() => Int, { nullable: true })
  occlusialActionId: number | null;

  @Field(() => Int, { nullable: true })
  rootOneActionId: number | null;

  @Field(() => Int, { nullable: true })
  rootTwoActionId: number | null;

  @Field(() => Int, { nullable: true })
  rootThreeActionId: number | null;
}
