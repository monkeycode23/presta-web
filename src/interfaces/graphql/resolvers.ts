import { AuthService } from "../../api/services/auth.service";

// authRequired.ts (middleware de resolver)
import { GraphQLError } from "graphql";

import { userResolvers } from "./resolvers/user.resolvers";

import { clientResolvers } from "./resolvers/client.resolvers";
import { loanResolvers } from "./resolvers/loan.resolvers";
import { lenderResolvers } from "./resolvers/lender.resolvers";
import { paymentsResolvers } from "./resolvers/payment.resolvers";

export const authRequired = (resolverFn: any) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const authHeader = context.req?.headers?.authorization || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new GraphQLError("No token provided");
    }

    try {
      const decoded: any = await AuthService.verifyAccessToken(token);
      context.user = decoded.data;
    } catch {
      throw new GraphQLError("Invalid or expired token");
    }

    return resolverFn(parent, args, context, info);
  };
};

export const resolvers = {
  Query: {
    ...userResolvers,
    ...clientResolvers,
    ...lenderResolvers,
    ...loanResolvers,
    ...paymentsResolvers
  },
};
