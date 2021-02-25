import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { ClinicResolver } from './resolvers/clinic';
import { DentistResolver } from './resolvers/dentist';
import { AssistantResolver } from './resolvers/assistant';
import { PatientResolver } from './resolvers/patient';
import { AppointmentResolver } from './resolvers/appointment';
import { ChartRecordResolver } from './resolvers/chart';
import { TeethResolver } from './resolvers/teeth';
import { TreatmentResolver } from './resolvers/treatment';
import { getUser, User } from './utils/utils';
import { UserResolver } from './resolvers/user';
import { createServer } from 'http';

export type Context = {
  prisma: PrismaClient;
  user: User | null;
};

const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [
      ClinicResolver,
      UserResolver,
      DentistResolver,
      AssistantResolver,
      PatientResolver,
      AppointmentResolver,
      ChartRecordResolver,
      TeethResolver,
      TreatmentResolver,
    ],
    authChecker: ({ context: { user } }: { context: Context }, roles) => {
      // if `@Authorized()`, check only if user exists
      if (roles.length === 0) return user !== null;

      // there are some roles defined now

      // and if no user, restrict access
      if (!user) return false;

      if (user.roles.some((role) => roles.includes(role))) return true;

      // no roles matched, restrict access
      return false;
    },
  });

  const prisma = new PrismaClient();

  /*   const context = createContext(); */

  const apolloServer = new ApolloServer({
    schema,
    /* context, */
    context: ({ req, connection }) => {
      if (connection) {
        return connection.context;
      }

      const user: User | null = getUser(req);

      return { prisma, user };
    },
  });

  const httpServer = createServer(app);
  apolloServer.applyMiddleware({ app });
  apolloServer.installSubscriptionHandlers(httpServer);

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready on port ${PORT}${apolloServer.graphqlPath}`);
    console.log(
      `🚀 Subscriptions ready on port ${PORT}${apolloServer.subscriptionsPath}`
    );
  });

  /* app.listen(PORT, () => {
    console.log(
      `🚀 Server ready on port ${PORT} and graph on ${apolloServer.graphqlPath} `
    );
    console.log(
      `🚀 Server ready on port ${PORT} and subscriptions on ${apolloServer.subscriptionsPath} `
    );
  }); */
};

main();
