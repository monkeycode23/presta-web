import mongoose from "mongoose";

import { ILoanDocument } from "../../../../types/general";



const prestamoSchema = new mongoose.Schema<ILoanDocument>(
  {
    label: {
      type: String,
      trim: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    gain: {
      type: Number,

      min: 0,
    },
    interest_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    installment_number: {
      type: Number,
      required: true,
      min: 1,
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    loan_date: {
      type: Date,
      default: Date.now,
    },
    disbursement_date: {
      type: Date,
      default: Date.now,
    },

    paid_installments: {
      type: Number,
      default:0,
      min:0
    },
    first_payments_date: {
      type: Date,
    },
    generate_payments_date: {
      type: Date,
    },
    interest_rate: {
      type: Number,
      required: true,
      min: 0,
    },
    term: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Pendiente",
        "pending",
        "active",
        "completed",
        "cancelled",
        "refounded",
        "Aprobado",
        "Rechazado",
        "En curso",
        "Pagado",
        "Vencido",
        "Cancelado",
      ],
      default: "active",
    },
    payment_interval: {
      type: String,
      enum: [
        "daily",
        "weekly",
        "monthly",
        "fortnightly",
        "fortnigt",
        "yearly",
        "custom",
        "fortnightly",
        "unique",
        "Diario",
        "Semanal",
        "Quincenal",
        "Mensual",
        "Personalizado",
      ],
      default: "daily",
    },
    // Campos adicionales
    description: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    collateral: {
      type: String,
      trim: true,
    },
    next_payment_date: {
      type: Date,
    },
    last_payment_date: {
      type: Date,
    },
    paid_amount: {
      type: Number,
      default: 0,
      min: 0,
    },
    left_amount: {
      type: Number,
      min: 0,
    },
    payment_due_day: {
      type: Number,
      min: 1,
      max: 31,
    },
    late_fee_rate: {
      type: Number,
      default: 0,
      min: 0,
    },
    late_fee_amount: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Middleware para calcular el monto restante
/* prestamoSchema.pre('save', function(next) {
  if (this.isModified('total_paid') || this.isModified('total_amount')) {
    this.remaining_amount = this.total_amount - this.total_paid;
  }
  next();
}); */

const Loan = mongoose.model("Loan", prestamoSchema);

export default Loan;
