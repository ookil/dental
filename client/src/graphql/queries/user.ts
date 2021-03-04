import { gql } from '@apollo/client';

export const GET_LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      id
      clinic {
        id
      }
    }
  }
`;
