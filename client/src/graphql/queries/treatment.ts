import { gql } from '@apollo/client';

export type Treatment = {
  id: number;
  name: string;
  description: string;
  category: string;
};

export type TreatmentData = {
  treatments: Treatment[];
};

export type TreatmentCategory =
  | 'PREVENTIVE'
  | 'DIAGNOSTIC'
  | 'ENDODONTICS'
  | 'PERIODONTICS'
  | 'PROSTHETICS'
  | 'OTHER';

export type TreatmentVar = {
  category: TreatmentCategory;
};

export const GET_TREATMENTS = gql`
  query GetTreatments($category: TreatmentCategory) {
    treatments(category: $category) {
      id
      name
      description
      category
    }
  }
`;
