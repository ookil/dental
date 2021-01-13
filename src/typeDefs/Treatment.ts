import { Length } from 'class-validator';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

export enum TreatmentStatus {
  EXISTING = 'EXISTING',
  COMPLETED = 'COMPLETED',
  PLANNED = 'PLANNED',
}

export enum TreatmentCategory {
  PREVENTIVE = 'PREVENTIVE',
  DIAGNOSTIC = 'DIAGNOSTIC',
  ENDODONTICS = 'ENDODONTICS',
  PERIODONTICS = 'PERIODONTICS',
  PROSTHETICS = 'PROSTHETICS',
  OTHER = 'OTHER',
}

registerEnumType(TreatmentCategory, { name: 'TreatmentCategory' });
registerEnumType(TreatmentStatus, { name: 'TreatmentStatus' });

@ObjectType()
export class Treatment {
  @Field(() => ID)
  id: number;

  @Field()
  @Length(1, 50)
  name: string;

  @Field()
  @Length(1, 100)
  description: string;

  @Field(() => TreatmentCategory)
  category: TreatmentCategory;
}
