import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { ClinicResolver } from './resolvers/clinic';

type GraphqlSchema = {
  schema: GraphQLSchema;
};

export async function createSchema(): Promise<GraphqlSchema> {
  const schema = await buildSchema({
    resolvers: [ClinicResolver],
  });

  return { schema };
}
