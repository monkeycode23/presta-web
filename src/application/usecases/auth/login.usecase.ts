// src/application/use-cases/login-user.use-case.ts
import { AuthService } from "@/application/services/auth.service";

export class LoginUserUseCase {
  constructor(private authService: AuthService) {}

  async execute(email: string, password: string) {
    // Aquí es donde se llama al servicio de autenticación
    const { token, user } = await this.authService.login(email, password);

    // En un caso real, puedes agregar lógica extra si es necesario
    return { token, user };
  }
}