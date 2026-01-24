
import mongoose from 'mongoose';
import { Schema, model, Types } from "mongoose";

export interface IRole {
  _id: Types.ObjectId;
  name: string;
  permissions: string[];
}

const RoleSchema = new mongoose.Schema<IRole>({
  name: { type: String, required: true, unique: true }, // 'cliente', 'empleado', 'admin'
  permissions: [{ 
    type: String,
    
}] // lista de permisos como 'crear_prestamo', 'ver_clientes'
});
const Role = mongoose.model<IRole>('Role', RoleSchema);


export default Role