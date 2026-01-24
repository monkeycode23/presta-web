import { GraphQLError } from "graphql/error";

export const requireAuth = (ctx: any) => {
  if (!ctx.user) {
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
};