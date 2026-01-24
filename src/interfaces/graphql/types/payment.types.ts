import { gql } from "graphql-tag";

export const PaymentTypeDefs = gql`
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
    _id: ID!
    
    label: String

    loan: Loan!
    client:Client!

    interest_amount: Float!
    gain: Float
    total_amount: Float

    payment_date: DateTime!

    net_amount: Float!
    amount: Float!

    status: String

    left_amount: Float
    paid_amount: Float
    paid_date: DateTime

    incomplete_amount: Float

    payment_method: String

    installment_number: Int!
    dueDate: DateTime

    lateFee: Float!
    late_days: Int!

    receiptNumber: String
    transactionId: String

    notes: String

    processed_by: User
    user: User

    createdAt: DateTime!
    updatedAt: DateTime!
  }

 

 input PaymentsFilter {
  loanId: String
  status: [String]
  order:String
  
}

input PaymentDate {
    from:String
    to:String
    exact:String
}
input PaymentsFilter2 {
  loanId: String
  status: [String]
  order:String
  clientId:String
  client:String
  payment_date:PaymentDate
  userId:String
  
}
  type PaginationFilterPayments {
    pagination: Pagination
    data: [Payment]
  }
  type PaymentsCalendarDay {
  _id:String
  total:Int
  pending:Int 
  expired:Int
  paid:Int
  incomplete:Int
  paidAmount:Int
  totalAmount:Int
}


input PaymentsStatusFilter {
  payment_date:PaymentDate
  userId:ID
  
}
`; 


export const paymentQueries = gql`
  extend type Query {
    getPayments(filter:PaymentsFilter2,pagination:PaginationFilter): PaginationFilterPayments
    getClientPayments(clientId: ID!,filter:PaymentsFilter,pagination:PaginationFilter): PaginationFilterPayments

    paymentsStatus(filter:PaymentsStatusFilter):[PaymentsCalendarDay]
  }
`;
