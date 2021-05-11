import { Length } from 'class-validator';
import { ObjectType, Field, ID } from 'type-graphql';
import { Patient } from './Patient';
import { TreatmentStatus } from './Treatment';

@ObjectType()
export class ChartRecord {
  @Field(() => ID)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  @Length(3, 20)
  type: string;

  @Field()
  @Length(3, 100)
  description: string;

  @Field()
  @Length(2, 3)
  tooth: string;

  @Field()
  doctor: String;

  @Field(() => TreatmentStatus)
  status: TreatmentStatus;

  @Field(() => Patient)
  patient: Patient;
}
