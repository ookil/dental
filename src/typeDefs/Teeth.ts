import { Field, Int, ObjectType } from 'type-graphql';
import { ToothSurface } from './Patient';
import { Treatment } from './Treatment';

@ObjectType()
export class Teeth {
  @Field(() => Int)
  patientId: number;

  @Field()
  id: string;

  @Field(() => ToothSurface)
  surface: ToothSurface;

  @Field(() => Treatment)
  description: Treatment;

  @Field()
  createdAt: Date;
}
