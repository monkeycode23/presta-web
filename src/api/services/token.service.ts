import jwt from "jsonwebtoken";
import { TokenModel } from "../models/token.model";
const ACCESS_SECRET = process.env.ACCESS_SECRET || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "TOKEN-secret";



type DecodedJwt = {
  decoded:any,
  valid:boolean,
  expired:boolean
};
// auth.service.ts
export class TokenService {


  static async verifyToken(token: string,exception:boolean = false,sign:string):Promise<DecodedJwt> {
    
    if (!token) throw new Error("No token provided");

  console.log("asdasdas1111")
    const decoded = jwt.verify(token,sign,{
      ignoreExpiration: exception,
    });

    
    //console.log(decoded,"decoded")

     if (!exception) {
      const now = Math.floor(Date.now() / 1000);

      // Si el payload es string → no tiene exp, así que es inválido
      if (typeof decoded === "string") {
        return { valid: false, expired: false, decoded: null };
      }

      // Aquí TypeScript ya sabe que decoded es JwtPayload
      if (decoded.exp && decoded.exp < now) {
        return { valid: false, expired: true, decoded };
      }

      return { valid: true, expired: false, decoded };
    }

    return { valid: true, expired: false, decoded };
  }

  static async generateToken(data:any,sign:string,expired:number | string | undefined) {

    
    const  token =jwt.sign({ data },sign ,{ expiresIn: expired ?? "10m" } as jwt.SignOptions);

    //console.log(token,"token")
    
    return token

    
    }
 

}


