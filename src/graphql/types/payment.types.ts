import { gql } from "graphql-tag";

export const PaymenttypeDefs = gql`
  enum PaymentStatus {
    PENDING
    PAID
    EXPIRED
    INCOMPLETE
    CANCELLED
    REFUNDED
    FAILED
  }

  enum PaymentMethod {
    CASH
    TRANSFER
    CREDIT_CARD
    CHECK
    MERCADO_PAGO
    OTHER
  }


  type Payment {
    id: ID!
    
    label: String

    loan: Loan!

    interestAmount: Float!
    gain: Float
    totalAmount: Float

    paymentDate: DateTime!

    netAmount: Float!
    amount: Float!

    status: PaymentStatus!

    leftAmount: Float
    paidAmount: Float
    paidDate: DateTime

    incompleteAmount: Float

    paymentMethod: PaymentMethod!

    installmentNumber: Int!
    dueDate: DateTime

    lateFee: Float!
    lateDays: Int!

    receiptNumber: String
    transactionId: String

    notes: String

    processedBy: User
    user: User

    

    createdAt: DateTime!
    updatedAt: DateTime!
  }

 



  type PaginationFilterPayments {
    pagination: Pagination
    data: [Payment]
  }
`;

export const clientQueries = gql`
  extend type Query {
    getClientPayments(clientId: ID!): PaginationFilterPayments
  }
`;
