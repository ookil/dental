import { Length } from 'class-validator';
import { Field, Int, ObjectType, registerEnumType } from 'type-graphql';
import { Treatment } from './Treatment';

@ObjectType()
export class Teeth {
  @Field(() => Int)
  patientId: number;

  @Field()
  @Length(2, 3) // teeth naming (P)XY, P - primary, X - quadrants, Y - tooth
  id: string;

  @Field(() => ToothSurface)
  surface: ToothSurface;

  @Field(() => Treatment)
  treatment: Treatment;

  @Field()
  createdAt: Date;
}

export enum ToothSurface {
  BUCCAL = 'BUCCAL',
  LINGUAL = 'LINGUAL',
  DISTAL = 'DISTAL',
  MESIAL = 'MESIAL',
  ROOT = 'ROOT',
  CROWN = 'CROWN',
}

registerEnumType(ToothSurface, { name: 'ToothSurface' });
