import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IClient } from "../../types/general";
 
const clienteSchema = new mongoose.Schema<IClient>(
  {
    nickname: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    name: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      //trim: true
    },
    address: {
      type: String,
      //trim: true
    },
    status: {
      type: String,
      enum: ["activo", "inactivo", "pendiente", "bloqueado","active","inactive","blocked","banned"], // Added enum for valid statuses
      default: "activo",
    },
    gender: {
      type: String,
      trim: true,
    },

    birthdate: {
      type: String,
      trim: true,
    },
    document_id: {
      type: Number,
    },
    cbu: {
      type: String,
      trim: true,
      sparse: true,
    },
    aliasCbu: {
      type: String,
      trim: true,
    },
    accessCode: {
      type: String,
      trim: true,
      
    },
    password: {
      type: String,
      select: false, // No incluir en consultas por defecto
    },

    phone_verified: {
      type: Boolean,
      default: false,
    },
    document_verified: {
      type: Boolean,
      default: false,
    },

    client_since: {
      type: Date,
    },

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],

    notes: { type: String },

    isConnected: Boolean,

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
        client_debt: { type: Number, default: 0 ,min: 0,},
        overdue_debt: { type: Number, default: 0 ,min: 0,},
        net_gain: { type: Number, default: 0 ,min: 0,},
        gross_gain: { type: Number, default: 0,min: 0, },
        total_interest:{ type: Number, default: 0,min: 0, },
      },
      reputation: {
        score: { type: Number, default: 100 ,min: 0,},
        late_payments: { type: Number, default: 0 ,min: 0,},
        on_time_payments: { type: Number, default: 0,min: 0, },
        cancelled_loans: { type: Number, default: 0 ,min: 0,},
      },
      activity: {
        last_payment_at: Date,
        last_loan_at: Date,
        first_loan_at: Date,
      },
    },

    loans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Pre-save hook para encriptar contraseña
/* clienteSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
clienteSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Obtener la contraseña incluida
    const cliente = await this.constructor.findById(this._id).select('+password');
    if (!cliente.password) return false;
    
    return await bcrypt.compare(candidatePassword, cliente.password);
  } catch (error) {
    throw error;
  }
};
 */
const Client = mongoose.model("Client", clienteSchema);

export default Client;
