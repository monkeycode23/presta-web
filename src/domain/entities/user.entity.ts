// src/domain/entities/user.ts
export class User {
  public id?: string;
  public email: string;
  public username: string;
  public passwordHash: string;
  public avatar: string;
  public verifiedEmail: boolean;
  public roles: string[] = [];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: Partial<User>) {
    this.id = params.id;
    this.email = params.email!;
    this.username = params.username!;
    this.passwordHash = params.passwordHash!;
    this.avatar = params.avatar ?? "https://default-avatar.com";
    this.verifiedEmail = params.verifiedEmail ?? false;
    this.roles = params.roles ?? [];
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
  }

  // Métodos como hasRole, etc.
  hasRole(roleName: string): boolean {
    return this.roles.includes(roleName);
  }
}
