import mongoose from "mongoose";
import  type { IPaymentDocument,
 
} from "../../types/general";

export enum PaymentMethod {
  CASH = "cash",
  TRANSFER = "transfer",
  CREDIT_CARD = "credit_card",
  CHECK = "check",
  MERCADO_PAGO = "mercado_pago",
  OTHER = "other",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  EXPIRED = "expired",
  INCOMPLETE = "incomplete",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  FAILED = "failed",
}
 

const pagoSchema = new mongoose.Schema<IPaymentDocument>(
  {
    label: {
      type: String,
      trim: true,
    },
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },
    interest_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    gain: {
      type: Number,
      default: 0,
      min: 0,
    },
    total_amount: {
      type: Number,

      min: 0,
      default: 0,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
    net_amount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    left_amount: {
      type: Number,

      min: 0,
    },
    paid_amount: {
      type: Number,

      min: 0,
    },
    paid_date: {
      type: Date,
    },
    incomplete_amount: {
      type: Number,
      min: 0,
    },
    payment_method: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.CASH,
    },
    // Campos adicionales
    installment_number: {
      type: Number,
      default: 1,
      min: 1,
    },
    due_date: {
      type: Date,
    },
    late_fee: {
      type: Number,
      default: 0,
      min: 0,
    },
    late_days: {
      type: Number,
      default: 0,
      min: 0,
    },
    receipt_number: {
      type: String,
      trim: true,
    },
    transaction_id: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    processed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comprobantes: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        filename: { type: String },
        uploadedAt: { type: Date, default: Date.now },
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

// Hook para actualizar el préstamo cuando se realiza un pago
/* pagoSchema.post('save', async function() {
  const Prestamo = mongoose.model('Prestamo');
  
  try {
    const prestamo = await Prestamo.findById(this.loan_id);
    
    if (prestamo && this.status === 'Completado') {
      // Agregar el pago al arreglo de pagos del préstamo
      if (!prestamo.payments.includes(this._id)) {
        prestamo.payments.push(this._id);
        prestamo.total_paid += this.amount;
        prestamo.last_payment_date = this.payment_date;
      }
      
      // Actualizar el estado del préstamo si está completamente pagado
      if (prestamo.total_amount <= prestamo.total_paid) {
        prestamo.status = 'Pagado';
      }
      // Ensure remaining_amount doesn't go below zero
      prestamo.remaining_amount = Math.max(0, prestamo.total_amount - prestamo.total_paid);

      await prestamo.save();
    }
  } catch (error) {
    console.error('Error al actualizar el préstamo después del pago:', error);
  }
}); */

const Payment = mongoose.model("Payment", pagoSchema);

export default Payment;
