// src/application/services/auth.service.ts
import { UserRepository } from "@/domain/repositories/user.repository";
import { JwtService } from "@/infrastructure/auth/jwt.service";
import { User } from "@/domain/entities/user.entity";
import { Response } from "express";
import { TokenModel } from "@/infrastructure/database/mongo/models/token.model";


export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService
  ) {}

  
   async generateAccessToken(userId: string) {
  
      const accessToken =await  this.jwtService.generate({ userId },"20m")
      return accessToken
    }
  
  
     async verifyAccessToken(token: string,exception?:boolean) {
  
  /*     console.log(ACCESS_SECRET,"ACCESS_SECRET")
  console.log(REFRESH_SECRET,"REFRESH_SECRET")
  console.log(FORGOT_SECRET,"FORGOT_SECRET") */
  
  
      const decoded = await this.jwtService.verify(token,exception ?? false) as any;
  
      return decoded
    }
  
  
    /**
     * REFRESH  TOKENNN GEN AND VERIFY
     */
  
     async verifyRefreshToken(token: string) {
  
  /*     console.log(ACCESS_SECRET,"ACCESS_SECRET")
  console.log(REFRESH_SECRET,"REFRESH_SECRET")
  console.log(FORGOT_SECRET,"FORGOT_SECRET") */
  
      
        const decoded = await this.jwtService.verify(token,false) as any;
  
      return decoded.decoded
    
    }
  
     async generateRefreshToken(userId: string, res: Response) {
      
       const refreshToken =await  this.jwtService.generate({ userId },"7d")
     
       const token = new TokenModel({
        userId,
        token: refreshToken,
        type: "refresh-token",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      });
    
      await token.save();
  
      //this.setRefreshTokenCookie(refreshToken, res);
      console.log(refreshToken,"refreshToken")
      return token;
      
    }
  
    static setRefreshTokenCookie(refreshToken:string, res:Response){
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        
      });
    }
  
  
    /**
     * FORGOT TOKENNN GEN AND VERIFY
     */
  
      async generateForgotToken(code:number){
       
         const forgotToken = await  this.jwtService.generate({ code },"10m")
  
         return forgotToken
    }
  
      async verifyForgotToken(token: string) {
  
        const decoded = await this.jwtService.verify(token,true,) as any;
  
        console.log(decoded,"decoded")
      return decoded.decoded.data
     
    }
  
  
    /**
     * FORGOT RESET TOKENNN  GEN AND VERIFY
     */
    
     generateForgotResetToken(code:number){
       return this.jwtService.generate({ code }, "10m");
    }
  
  
       generateVerificationCode(lenght:number = 4): number {
      return Math.floor(1000 + Math.random() * 9000);
    }
}
