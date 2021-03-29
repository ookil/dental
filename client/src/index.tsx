import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { cache } from './cache';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: `/graphql`,
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      authorization:
        sessionStorage.getItem('token') ||
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNCwicm9sZXMiOlsiQURNSU4iXX0sImlhdCI6MTYxMDgwODgxNH0.sT4PL-3W9AqE7NCPddgPWZe0JgS1zksr-UV-k9OK4zc',
    },
  },
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

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJyb2xlcyI6WyJBRE1JTiJdfSwiaWF0IjoxNjE1MjAwNjUxfQ.lSqg_cJoCphQLKvsrUTZY3g2o-sgDESULtW8ZLRY8Ac
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNCwicm9sZXMiOlsiQURNSU4iXX0sImlhdCI6MTYxMDgwODgxNH0.sT4PL-3W9AqE7NCPddgPWZe0JgS1zksr-UV-k9OK4zc

const authHttpLink = authLink.concat(httpLink);

//Using this logic, queries and mutations will use HTTP as normal, and subscriptions will use WebSocket.
const link = split(
  (operation) => {
    const definition = getMainDefinition(operation.query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authHttpLink
);

const typeDefs = gql`
  extend type Dentist {
    nameWithSurname: String
  }

  extend type Patient {
    nameWithSurname: String
  }
`;

export const client = new ApolloClient({
  link,
  cache,
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
