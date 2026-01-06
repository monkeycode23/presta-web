import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  lender: mongoose.Types.ObjectId;     
  name: string;
  email: string;
  phone?: string;
  roles: string[];                      
  permissions: string[];               
  createdAt: Date;
  updatedAt: Date;
}


const EmployeeSchema: Schema = new Schema({
  lender: { type: Schema.Types.ObjectId, ref: "Lender", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  roles: [{ type: String, default: "employee" }],  // rol por defecto
  permissions: [{ type: String }],                 // ejemplo: "loan:create", "client:view"
}, {
  timestamps: true,
});

 const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);

 export default Employee