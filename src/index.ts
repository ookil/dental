import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createContext } from './context';
import { ClinicResolver } from './resolvers/clinic';
import { DentistResolver } from './resolvers/dentist';

export const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [ClinicResolver, DentistResolver],
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
