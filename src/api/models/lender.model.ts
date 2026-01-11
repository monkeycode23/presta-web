import mongoose, { Schema, Document } from "mongoose";

export interface ILender extends Document {
    _id:mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  roles: string[]; // roles asignados, ej: ['admin', 'gestor']
  clients: string[]; // referencias a clientes
  employees: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId; // referencias a empleados
  createdAt: Date;
  updatedAt: Date;
}

const LenderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
}, {
  timestamps: true, // createdAt y updatedAt automáticos
});

export default mongoose.model<ILender>("Lender", LenderSchema);
