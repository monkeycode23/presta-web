// infrastructure/http/controllers/AuthController.ts
import { NextFunction, Request, Response } from "express";

//import { AuthService } from "@/infrastructure/services/auth.service";
import { ApiResponse } from "@/application/utils/api.response";

export class AuthController {
  
    async login(req: Request, res: Response, next:NextFunction) {
    try {
      const { email, password } = req.body;

     /*  const useCase = new LoginLocalUseCase(
        new AuthRepositoryPg(),
        new LocalAuthService(),
        new JwtService()
      );

      const result = await useCase.execute(email, password); */
       ApiResponse.success(res,{
        
      },"User registered successfully",200)

    } catch (err: any) {
        next(err);
    }
  }
 

   async register(req: Request, res: Response, next:NextFunction) {
    try {
      const { email, password, username } = req.body;

   /*    const useCase = new RegisterLocalUseCase(
        new AuthRepositoryPg(),
        new LocalAuthService(),
        new UserRepositoryPg(),
        new RoleRepositoryPg(),
        new SchoolRepositoryPg(),
        new PersonRepositoryPg(),
        new JwtService()
      );

      const result = await useCase.execute(username, email, password);
      */

      ApiResponse.success(res,{
        
      },"User registered successfully",200)

    } catch (err: any) {
        console.log(err)
         console.log(err.meta)
        next(err)
    }
  }
}