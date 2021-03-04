import { gql } from '@apollo/client';


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
