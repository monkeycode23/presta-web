import { Document, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;

  email: string;
  username: string;
  passwordHash: string;

  avatar?: string;
  bio?: string | null;

  emailVerified: boolean;
  verificationToken?: string | null;
  verificationTokenExpires?: Date | null;

  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;

  failedLoginAttempts: number;
  lockUntil?: Date | null;

  terms: boolean;
  privacy: boolean;

  refreshTokens: Types.ObjectId[];

  roles: Types.ObjectId[] | any[]; // se poblará con Role

  notifications: Types.ObjectId[];

  rooms: {
    room: Types.ObjectId;
    lastMessageRead?: Date | null;
  }[];

  activities: Types.ObjectId[];

  twoFactorEnabled: boolean;
  twoFactorSecret?: string | null;

  created_at?: Date;
  updated_at?: Date;
}

export interface IClient extends Document {
  _id: string;
  nickname: string;
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;

  status: "activo" | "inactivo" | "pendiente" | "bloqueado";

  gender?: string;
  birthdate?: string;
  document_id?: number;

  cbu?: string;
  aliasCbu?: string;

  accessCode: string;
  password?: string;

  email_verified: boolean;
  phone_verified: boolean;
  document_verified: boolean;

  notes?: string;
  isConnected?: boolean;
  statics: {
    loans: {
      total: number;
      active: number;
      completed: number;
      cancelled: number;
      overdue: number; // préstamos con cuotas vencidas
    };

    payments: {
      total: number;
      pending: number;
      paid: number;
      expired: number;
      incomplete: number;
    };

    amounts: {
      total_lent: number; // total prestado
      total_paid: number; // total cobrado
      total_expected: number; // total a cobrar (capital + interés)
      client_debt: number; // pendiente + vencido
      overdue_debt: number; // solo vencido
      net_gain: number; // ganancia real
      gross_gain: number; // ganancia bruta (interés)
    };

    reputation: {
      score: number; // 0–100
      late_payments: number;
      on_time_payments: number;
      cancelled_loans: number;
    };

    activity: {
      last_payment_at?: Date;
      last_loan_at?: Date;
      first_loan_at?: Date;
    };
  };

  roles: Types.ObjectId[];
  loans: Types.ObjectId[];
  user?: Types.ObjectId;
  client_since: Date;
  created_at: Date;
  updated_at: Date;

  // Métodos (si luego los reactivas)
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
}

export interface ILoanDocument extends Document {
  _id:  Types.ObjectId;
  label?: string;

  client: Types.ObjectId;
progress:number;
  amount: number;
  gain?: number;
  interest_amount: number;
  installment_number: number;
  total_amount: number;
  total_paid: number;

  loan_date: Date;
  disbursement_date: Date;

  paid_installments?: number;
  first_payments_date?: Date;
  generate_payments_date?: Date;

  interest_rate: number;
  term?: string;

  status:
    | "Pendiente"
    | "pending"
    | "active"
    | "completed"
    | "cancelled"
    | "refounded"
    | "Aprobado"
    | "Rechazado"
    | "En curso"
    | "Pagado"
    | "Vencido"
    | "Cancelado";

  payment_interval:
    | "daily"
    | "weekly"
    | "monthly"
    | "fortnightly"
    | "fortnigt"
    | "yearly"
    | "custom"
    | "unique"
    | "Diario"
    | "Semanal"
    | "Quincenal"
    | "Mensual"
    | "Personalizado";

  description?: string;
  purpose?: string;
  collateral?: string;

  next_payment_date?: Date;
  last_payment_date?: Date;

  paid_amount: number;
  left_amount?: number;

  payment_due_day?: number;

  late_fee_rate: number;
  late_fee_amount: number;

  notes?: string;

  user?: Types.ObjectId;

  payments: Types.ObjectId[];

  created_at: Date;
  updated_at: Date;
}

/** payment */

import { PaymentStatus, PaymentMethod } from "../api/models/payment.model";

export interface IPaymentDocument extends Document {
    _id: String
  label?: string;

  loan: Types.ObjectId;

  interest_amount: number;
  gain?: number;

  total_amount: number;

  payment_date: Date;

  net_amount: number;
  amount: number;

  status: PaymentStatus;

  left_amount?: number;
  paid_amount?: number;
  paid_date?: Date;

  incomplete_amount?: number;

  payment_method: PaymentMethod;

  installment_number: number;
  due_date?: Date;

  late_fee: number;
  late_days: number;

  receipt_number?: string;
  transaction_id?: string;

  notes?: string;
client?: Types.ObjectId;
  processed_by?: Types.ObjectId;
  user_id?: Types.ObjectId;

  comprobantes: {
    public_id: string;
    url: string;
    filename?: string;
    uploadedAt: Date;
  }[];

  created_at: Date;
  updated_at: Date;
}
