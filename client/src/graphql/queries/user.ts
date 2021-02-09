import { gql } from '@apollo/client';
import { SettingsData } from './clinic';

export type LoggedUser = {
  id: string;
  clinic: {
    id: string;
    settings: SettingsData;
  };
};

export type UserData = {
  loggedUser: LoggedUser;
};

export const GET_LOGGED_USER = gql`
  query loggedUser {
    loggedUser {
      id
      clinic {
        id
      }
    }
  }
`;
