import mongoose, { Schema, Document } from "mongoose";

export interface ILender extends Document {
    _id:mongoose.Types.ObjectId;
  name: string;
  lastname: string;
  nickname:string;
  email: string;
  phone?: string;
  address?: string;
  bussiness:string;
  roles: string[]; // roles asignados, ej: ['admin', 'gestor']
  clients: string[]; // referencias a clientes
  employees: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId; // referencias a empleados
  createdAt: Date;
  updatedAt: Date;
}

const LenderSchema: Schema = new Schema({
  name: { type: String,default:" Lender"},
  lastname: { type: String,default:" Lender Lastname" },
  nickname:{ type: String,default:" Lender234"},
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  bussiness:{ type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
   statics: {
        loans: {
        total: { type: Number, default: 0 ,min: 0,},
        active: { type: Number, default: 0,min: 0, },
        completed: { type: Number, default: 0,min: 0, },
        canceled: { type: Number, default: 0,min: 0, },
        
      },
      payments: {
        total: { type: Number, default: 0 ,min: 0,},
        pending: { type: Number, default: 0,min: 0, },
        paid: { type: Number, default: 0,min: 0, },
        expired: { type: Number, default: 0,min: 0, },
        incomplete: { type: Number, default: 0,min: 0, },
      },
      amounts: {
        total_lent: { type: Number, default: 0,min: 0, },
        total_paid: { type: Number, default: 0 ,min: 0,},
        total_expected: { type: Number, default: 0 ,min: 0,},
        total_left:{ type: Number, default: 0 ,min: 0,},
        clients_debt: { type: Number, default: 0 ,min: 0,},
        overdue_debt: { type: Number, default: 0 ,min: 0,},
        net_gain: { type: Number, default: 0 ,min: 0,},
        gross_gain: { type: Number, default: 0,min: 0, },
        total_interest:{ type: Number, default: 0,min: 0, },
      },
     
    },
}, {
  timestamps: true, // createdAt y updatedAt automáticos
});

export default mongoose.model<ILender>("Lender", LenderSchema);
