import mongoose, { Schema, Document } from "mongoose";

export interface ILender extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  roles: string[]; // roles asignados, ej: ['admin', 'gestor']
  clients: mongoose.Types.ObjectId[]; // referencias a clientes
  employees: mongoose.Types.ObjectId[]; // referencias a empleados
  createdAt: Date;
  updatedAt: Date;
}

const LenderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  roles: [{ type: String, enum: ["owner", "admin", "employee"], default: "owner" }],
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
}, {
  timestamps: true, // createdAt y updatedAt automáticos
});

export default mongoose.model<ILender>("Lender", LenderSchema);
