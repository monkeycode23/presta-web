import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { authRequired } from "../api/middlewares/auth.middleware";
import { AuthService } from "../api/services/auth.service";
// La función que vas a llamar en tu server.ts
import { GraphQLError } from "graphql";

export async function setupGraphQL(app: any) {
  // 1️⃣ Crear schema ejecutable para Apollo v5
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // 2️⃣ Crear ApolloServer con ese schema
  const server = new ApolloServer({
    schema,
  });

  // 3️⃣ Iniciar Apollo Server
  await server.start();

  // 4️⃣ Integrarlo con Express usando graphql-http
  app.use(
    "/graphql",
   
    createHandler({
      schema,
     
    })
  );

  console.log("🚀 GraphQL listo en http://localhost:5000/graphql");
}
