import { gql } from "graphql-tag";

export const LoantypeDefs = gql`


   enum LoanStatus {
      PENDING
      ACTIVE
      COMPLETED
      CANCELLED
      REJECTED
      REFUNDED
      OVERDUE
    }

  enum PaymentInterval {
  DAILY
  WEEKLY
  FORTNIGHTLY
  MONTHLY
  YEARLY
  UNIQUE
  CUSTOM
}

   type Loan {
    _id:ID;
  _id: String;
  label: String;

  client: Client;

  amount: number;
  gain: number;
  interest_amount: number;
  installment_number: number;
  total_amount: number;

  loan_date: Date;
  disbursement_date: Date;

  paid_installments: number;
  first_payments_date: Date;
  generate_payments_date: Date;

  interest_rate: number;
  term: String;

  status:LoanStatus

  payment_interval:PaymentInterval
   

  description: String;
  purpose: String;
  collateral: String;

  next_payment_date: Date;
  last_payment_date: Date;

  paid_amount: number;
  left_amount: number;

  payment_due_day: number;

  late_fee_rate: number;
  late_fee_amount: number;

  notes: String;

  user:User;

  payments:[Payment];

  created_at: DateTime;
  updated_at: DateTime;

  }
  

  type PaginationFilterLoans {
    pagination: Pagination
    data: [Loan]
  }
  
`;

export const clientQueries = gql`
  extend type Query {
    getClientLoans(clientId: ID!): PaginationFilterLoans
  }
`;
