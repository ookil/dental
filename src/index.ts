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
import { TeethResolver } from './resolvers/tooth';
import { TreatmentResolver } from './resolvers/treatment';
import { getUser, User } from './utils/utils';
import { UserResolver } from './resolvers/user';
import { createServer } from 'http';
import { CrownResolver } from './resolvers/crownSurface';
import { SurfaceFillResolver } from './resolvers/surfaceFill';
import { RootResolver } from './resolvers/rootSurface';

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
      CrownResolver,
      RootResolver,
      SurfaceFillResolver,
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

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, connection }) => {
      if (connection) {
        return { prisma };
      }

      const auth = req.headers.authorization;

      const user: User | null = getUser(auth);

      return { prisma, user };
    },
    subscriptions: {
      onConnect: (connectionParams) => {
        if (connectionParams.authorization) {
          const user = getUser(connectionParams.authorization);
          return { user };
        }
        throw new Error('Missing auth token!');
      },
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
