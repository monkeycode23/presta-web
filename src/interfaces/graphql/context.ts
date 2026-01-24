
import { AuthService } from "@/application/services/auth.service";
import { JwtService } from "@/infrastructure/auth/jwt.service";
import { UserRepositoryMongo } from "@/infrastructure/database/mongo/repositories/user.mongo.repository";


const authService = new AuthService(
    new UserRepositoryMongo(),
    new JwtService()
);

export const context = async ({headers}: any) => {

    console.log("Contexto GraphQL",headers);
   const authHeader = headers.authorization;
  const token = authHeader?.replace("Bearer ", "");
  let user = null;

  console.log("Token recibido en GraphQL:", token);

   if (token) {
    try {
     
       user =await authService.verifyAccessToken(token);
       
    } catch {
      user = null;
    }
  } 


  return {
    user,
  };
};
