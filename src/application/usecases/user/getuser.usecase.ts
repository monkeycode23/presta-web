// src/application/use-cases/login-user.use-case.ts
import { AuthService } from "@/application/services/auth.service";
import { UserRepository } from "@/domain/repositories/user.repository";

export class getUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string) {
    
    const user = await this.userRepo.findById(userId);
    
    return { user };
  }
}