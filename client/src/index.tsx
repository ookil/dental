import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';

const httpLink = createHttpLink({
  uri: `/graphql`,
});

console.log(process.env.REACT_APP_PORT);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${token}`
        : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlcyI6WyJBRE1JTiJdfSwiaWF0IjoxNjEyMTk4Nzg1fQ.5ra7xFyJddt0RKZT1HOmtXDIJe_9egxLwsa1ms6MZJo', //placeholder token
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
