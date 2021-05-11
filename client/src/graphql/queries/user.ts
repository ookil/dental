import { gql } from '@apollo/client';

export const GET_LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      id
      roles
      occupation
      clinic {
        id
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($occupation: String!, $userId: ID!) {
    getUserProfile(occupation: $occupation, userId: $userId) {
      ... on Dentist {
        id
        name
        surname
        nameWithSurname @client
        active
        appointments {
          id
          status
        }
      }
      ... on Assistant {
        id
        name
        surname
        active
      }
    }
  }
`;
