

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { TokenService } from "../services/token.service";
import { TokenModel } from "../models/token.model";
const ACCESS_SECRET = process.env.ACCESS_SECRET || "your_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_secret_key";
const FORGOT_SECRET = process.env.FORGOT_SECRET || "your_secret_key";

import  User  from "../models/User.model";
import { HashService } from "./password.service";
import { Response } from "express";
import { Console } from "console";



// auth.service.ts
export class AuthService {

  /**
   * ACCESS TOKENNN GEN AND VERIFY
   */
  static async generateAccessToken(userId: string) {

    const accessToken =await  TokenService.generateToken({ userId }, ACCESS_SECRET,"20m")
    return accessToken
  }


  static async verifyAccessToken(token: string,exception?:boolean) {

/*     console.log(ACCESS_SECRET,"ACCESS_SECRET")
console.log(REFRESH_SECRET,"REFRESH_SECRET")
console.log(FORGOT_SECRET,"FORGOT_SECRET") */


    const decoded = await TokenService.verifyToken(token,exception ?? false,ACCESS_SECRET) as any;

    return decoded
  }


  /**
   * REFRESH  TOKENNN GEN AND VERIFY
   */

  static async verifyRefreshToken(token: string) {

/*     console.log(ACCESS_SECRET,"ACCESS_SECRET")
console.log(REFRESH_SECRET,"REFRESH_SECRET")
console.log(FORGOT_SECRET,"FORGOT_SECRET") */

    
      const decoded = await TokenService.verifyToken(token,false,REFRESH_SECRET) as any;

    return decoded.decoded
  
  }

  static async generateRefreshToken(userId: string, res: Response) {
    
     const refreshToken =await  TokenService.generateToken({ userId }, REFRESH_SECRET,"7d")
   
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

  static  async generateForgotToken(code:number){
     
       const forgotToken = await  TokenService.generateToken({ code }, FORGOT_SECRET,"10m")

       return forgotToken
  }

   static async verifyForgotToken(token: string) {

      const decoded = await TokenService.verifyToken(token,true,FORGOT_SECRET) as any;

      console.log(decoded,"decoded")
    return decoded.decoded.data
   
  }


  /**
   * FORGOT RESET TOKENNN  GEN AND VERIFY
   */
  
  static generateForgotResetToken(code:number){
     return jwt.sign({ code }, FORGOT_SECRET, { expiresIn:  "10m" });
  }


    static generateVerificationCode(lenght:number = 4): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

}
