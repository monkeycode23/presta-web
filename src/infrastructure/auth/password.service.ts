// infrastructure/auth/localAuthService.ts
import bcrypt from "bcrypt";

export class PasswordService {
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }



  
  async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 10);
  }
  

  }
