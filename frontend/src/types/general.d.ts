export type PaymentFrequency = "diaria" | "semanal" | "mensual" | "indefinida";

export interface User {
  email: string;
  avatar: string;
  username?: string;
  _id?: string;
  emailVerified?: boolean;
  roles: string[];
}



export interface ILender {
  email: string;
  avatar: string;
  username?: string;
  _id?: string;
  emailVerified?: boolean;
  roles: string[];
}


// types/payment.ts
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

export interface PaymentReceipt {
  public_id: string;
  url: string;
  filename?: string;
  uploadedAt: string;
}

export interface IPayment {
  _id: string;
  label?: string;

  loan: ILoan;
  client: IClient;
  interest_amount: number;
  gain: number;
  total_amount: number;

  payment_date: string;
  paid_date?: string;
  due_date?: string;

  net_amount: number;
  amount: number;

  status: string;

  left_amount?: number;
  paid_amount?: number;
  incomplete_amount?: number;

  payment_method: string;

  installment_number: number;

  late_fee: number;
  late_days: number;

  receipt_number?: string;
  transaction_id?: string;
  notes?: string;

  processed_by?: User;
  user_id?: string;

  comprobantes: PaymentReceipt[];

  created_at: string;
  updated_at: string;
}

// types/loan.ts
export type LoanStatus =
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

export type PaymentInterval =
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

export interface ILoan {
  _id: string;
  label?: string;

  client: string;
  user?: string;

  amount: number;
  gain?: number;
  interest_amount: number;
  interest_rate: number;

  installment_number: number;
  total_amount: number;

  loan_date?: string;
  disbursement_date?: string;

  paid_installments?: number;
  paid_amount: number;
  left_amount?: number;

  first_payments_date?: string;
  generate_payments_date?: string;

  term?: string;
  status: LoanStatus;
  payment_interval: PaymentInterval;

  description?: string;
  purpose?: string;
  collateral?: string;

  next_payment_date?: string;
  last_payment_date?: string;

  payment_due_day?: number;

  late_fee_rate: number;
  late_fee_amount: number;

  notes?: string;

  payments: string[];

  created_at: string;
  updated_at: string;
}

export interface IClient {
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

  codigoAcceso: string;
  password?: string;

  email_verified: boolean;
  phone_verified: boolean;
  document_verified: boolean;

  notes?: string;
  isConnected?: boolean;

  loans: Types.ObjectId[];
  user?: Types.ObjectId;

  created_at: Date;
  updated_at: Date;

  client_since: Date;

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
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
  accessPin?: string;
}

export interface Payment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: "pendiente" | "pagada" | "vencida";
}

export interface ActivityLog {
  id: string;
  employeeId: string;
  employeeName: string;
  action:
    | "created_client"
    | "created_loan"
    | "registered_payment"
    | "updated_client"
    | "updated_loan";
  description: string;
  timestamp: Date;
  metadata?: {
    clientId?: string;
    clientName?: string;
    loanId?: string;
    paymentId?: string;
    amount?: number;
  };
}
export interface Loan {
  id: string;
  clientId: string;
  amount: number;
  interestRate: number;
  totalAmount: number;
  frequency: PaymentFrequency;
  installments: number;
  startDate: Date;
  status: "activo" | "completado" | "vencido";
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  hiredDate: Date;
  status: "activo" | "inactivo";
  accessPin?: string;
}

export interface ChatMessage {
  id: string;
  employeeId: string;
  message: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  clientId: string;
  type: "loan_granted" | "payment_registered" | "payment_due";
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  employeeId: string;
  employeeName: string;
  action:
    | "created_client"
    | "created_loan"
    | "registered_payment"
    | "updated_client"
    | "updated_loan";
  description: string;
  timestamp: Date;
  metadata?: {
    clientId?: string;
    clientName?: string;
    loanId?: string;
    paymentId?: string;
    amount?: number;
  };
}

// Datos de ejemplo
export const initialClients: Client[] = [
  {
    id: "1",
    nickname: "María González",
    phone: "+58 414-1234567",
    email: "maria.gonzalez@email.com",
    address: "Av. Principal #123, Caracas",
    createdAt: new Date("2024-01-15"),
    accessPin: "1234",
  },
  {
    id: "2",
    nicknickname: "Carlos Rodríguez",
    phone: "+58 424-9876543",
    email: "carlos.rodriguez@email.com",
    address: "Calle 5 #45, Maracaibo",
    createdAt: new Date("2024-02-20"),
    accessPin: "5678",
  },
  {
    id: "3",
    nickname: "Ana Martínez",
    phone: "+58 412-5555555",
    email: "ana.martinez@email.com",
    address: "Urbanización Los Rosales #78, Valencia",
    createdAt: new Date("2024-03-10"),
    accessPin: "9012",
  },
  {
    id: "4",
    nickname: "José Pérez",
    phone: "+58 416-7777777",
    email: "jose.perez@email.com",
    address: "Sector Centro #234, Barquisimeto",
    createdAt: new Date("2024-04-05"),
    accessPin: "3456",
  },
];

export const initialLoans: Loan[] = [
  {
    id: "1",
    clientId: "1",
    amount: 5000,
    interestRate: 15,
    totalAmount: 5750,
    frequency: "semanal",
    installments: 10,
    startDate: new Date("2024-11-01"),
    status: "active",
  },
  {
    id: "2",
    clientId: "1",
    amount: 3000,
    interestRate: 10,
    totalAmount: 3300,
    frequency: "mensual",
    installments: 6,
    startDate: new Date("2024-06-01"),
    status: "completed",
  },
  {
    id: "3",
    clientId: "2",
    amount: 8000,
    interestRate: 12,
    totalAmount: 8960,
    frequency: "mensual",
    installments: 12,
    startDate: new Date("2024-10-15"),
    status: "active",
  },
  {
    id: "4",
    clientId: "3",
    amount: 2500,
    interestRate: 20,
    totalAmount: 3000,
    frequency: "diaria",
    installments: 30,
    startDate: new Date("2024-11-20"),
    status: "active",
  },
  {
    id: "5",
    clientId: "4",
    amount: 10000,
    interestRate: 18,
    totalAmount: 11800,
    frequency: "semanal",
    installments: 20,
    startDate: new Date("2024-09-01"),
    status: "active",
  },
];

export const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Pedro Ramírez",
    email: "pedro.ramirez@empresa.com",
    phone: "+58 412-1111111",
    position: "Gerente de Cobranza",
    hiredDate: new Date("2023-01-10"),
    status: "activo",
    accessPin: "1111",
  },
  {
    id: "2",
    name: "Laura Fernández",
    email: "laura.fernandez@empresa.com",
    phone: "+58 424-2222222",
    position: "Analista de Crédito",
    hiredDate: new Date("2023-03-15"),
    status: "activo",
    accessPin: "2222",
  },
  {
    id: "3",
    name: "Roberto Silva",
    email: "roberto.silva@empresa.com",
    phone: "+58 414-3333333",
    position: "Asesor de Clientes",
    hiredDate: new Date("2023-06-20"),
    status: "activo",
    accessPin: "3333",
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "1",
    employeeId: "1",
    message:
      "Buenos días equipo, recordatorio de revisar los pagos vencidos de esta semana.",
    timestamp: new Date("2025-01-05T08:30:00"),
  },
  {
    id: "2",
    employeeId: "2",
    message:
      "Revisado, tenemos 3 clientes con pagos pendientes. Ya los estoy contactando.",
    timestamp: new Date("2025-01-05T09:15:00"),
  },
  {
    id: "3",
    employeeId: "3",
    message:
      "El cliente José Pérez solicitó información sobre un nuevo préstamo.",
    timestamp: new Date("2025-01-05T10:00:00"),
  },
];
