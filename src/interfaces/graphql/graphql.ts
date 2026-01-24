import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";


import { GraphQLError } from "graphql";
import { context } from "./context"

export async function setupGraphQL(app: any) {
  
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    "/graphql",
    createHandler({
      schema,
        context
    })
  );

  console.log("GraphQL server is set up at " + process.env.SERVER_DOMAIN + "/graphql");
}
