import { UserRepository } from "@/domain/repositories/user.repository";
import { User } from "@/domain/entities/user.entity";
import {UserModel} from "@/infrastructure/database/mongo/models/User.model";



export class UserRepositoryMongo implements UserRepository {

    // Buscar usuario por ID
  async findAll(): Promise<any | null> {
    const res = await UserModel.find().populate([
      'roles', 'userSubscriptions', 'person'
    ]);

    if (!res) return null;

    // Convertimos el documento de MongoDB a nuestra entidad de dominio
    return res;
    
    //new User({ ...res.toObject() });
  }
  // Buscar usuario por ID
  async findById(id: string): Promise<any | null> {
    const res = await UserModel.findById(id).populate([
      'roles', 'userSubscriptions', 'person'
    ]);

    if (!res) return null;

    // Convertimos el documento de MongoDB a nuestra entidad de dominio
    return res;
    
    //new User({ ...res.toObject() });
  }

  // Buscar usuario por email
  async findByEmail(email: string): Promise<any | null> {
    const res = await UserModel.findOne({ email }).populate([
      'roles', 'userSubscriptions', 'person'
    ]);

    if (!res) return null;

    // Convertimos el documento de MongoDB a nuestra entidad de dominio
    return res;

    //new User({ ...res.toObject() });
  }

  // Crear un nuevo usuario
  async create(data: any): Promise<any> {
    const userDoc = new UserModel(data);
    const res = await userDoc.save();

    // Convertimos el documento de MongoDB a nuestra entidad de dominio
    return  res;
    
    //new User({ ...res.toObject() });
  }

  // Actualizar usuario
  async update(id: string, data: Partial<any>): Promise<any | null> {
    // Omitir campos que no se pueden actualizar directamente (relaciones)
    const { roles, userSubscriptions, person, _id, ...updateData } = data;

    const res = await UserModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate(['roles', 'userSubscriptions', 'person']);

    if (!res) return null;

    // Convertimos el documento de MongoDB a nuestra entidad de dominio
    return res;

    //new User({ ...res.toObject() });
  }

  // Eliminar usuario
  async delete(id: string): Promise<boolean> {
    const res = await UserModel.findByIdAndDelete(id);
    return res !== null;
  }
}
