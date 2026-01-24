
import {User} from "../entities/user.entity";

export interface UserRepository {
    // Define los métodos que el repositorio de usuarios debe implementar
    findById(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    create(userData: any): Promise<User>;
    update(id: string, userData: any): Promise<User>;
    delete(id: string): Promise<boolean>;
}