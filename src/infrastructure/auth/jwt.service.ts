// infrastructure/auth/jwtService.ts
import jwt from "jsonwebtoken";

export class JwtService {
  private secret = process.env.JWT_SECRET || "secret";

  generate(data: any,expiresAt: any) {
    return jwt.sign(data, this.secret, { expiresIn: expiresAt ?? "15m" });
  }

  verify(token: string,exception: boolean) {

     if (!token) throw new Error("No token provided");
    
      
      jwt.verify(token, this.secret);

        const decoded = jwt.verify(token,this.secret,{
          ignoreExpiration: exception,
        });
    

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
}
