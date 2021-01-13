import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createContext } from './context';
import { ClinicResolver } from './resolvers/clinic';
import { DentistResolver } from './resolvers/dentist';
import { AssistantResolver } from './resolvers/assistant';
import { PatientResolver } from './resolvers/patient';
import { AppointmentResolver } from './resolvers/appointment';
import { ChartRecordResolver } from './resolvers/chart';
import { TeethResolver } from './resolvers/teeth';
import { TreatmentResolver } from './resolvers/treatment';

export const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [
      ClinicResolver,
      DentistResolver,
      AssistantResolver,
      PatientResolver,
      AppointmentResolver,
      ChartRecordResolver,
      TeethResolver,
      TreatmentResolver,
    ],
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
