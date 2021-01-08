import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createContext } from './context';
import { ClinicResolver } from './resolvers/clinic';

const main = async () => {
  const app = express();

  app.get('/', (_, res) => res.send('hello'));

  const schema = await buildSchema({
    resolvers: [ClinicResolver],
  });

  const context = createContext();

  const apolloServer = new ApolloServer({
    schema,
    context,
  });

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => console.log(`🚀 Server ready on port ${PORT} `));
};

main();
