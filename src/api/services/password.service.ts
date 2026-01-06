import bcrypt from "bcrypt";



// auth.service.ts
export class HashService {
    
  static async hashPassword(plain: string) {
  return await bcrypt.hash(plain, 10);
}

 
  static async  verifyPassword(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}
 
}


