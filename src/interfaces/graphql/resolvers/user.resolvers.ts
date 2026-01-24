import { getUserUseCase } from "@/application/usecases/user/getuser.usecase";
import { requireAuth } from "./auth.resolver";
import { UserRepositoryMongo } from "@/infrastructure/database/mongo/repositories/user.mongo.repository";

export const userResolvers = {
  getAuthUser: async (_: any, args: any, ctx: any) => {
    requireAuth(ctx);

    try {
      const { userId } = args;

      const useCase = new getUserUseCase(new UserRepositoryMongo());

      const user = await useCase.execute(userId);

      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  },
};
