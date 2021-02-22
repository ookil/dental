import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';

const httpLink = createHttpLink({
  uri: `/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${token}`
        : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNCwicm9sZXMiOlsiQURNSU4iXX0sImlhdCI6MTYxMDgwODgxNH0.sT4PL-3W9AqE7NCPddgPWZe0JgS1zksr-UV-k9OK4zc', //placeholder token
    },
  };
});

const typeDefs = gql`
  extend type Dentist {
    nameWithSurname: String
  }

  extend type Patient {
    nameWithSurname: String
  }
`;

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
