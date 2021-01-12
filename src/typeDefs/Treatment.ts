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
  name: string;

  @Field()
  description: string;

  @Field()
  category: TreatmentCategory;
}
