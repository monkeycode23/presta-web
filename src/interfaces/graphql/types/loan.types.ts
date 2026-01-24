import { gql } from "graphql-tag";

export const LoanTypeDefs = gql`



  type Loan {
    _id: ID
    label: String

    client: Client

    amount: Float
    gain: Float
    interest_amount: Float
    installment_number: Int
    total_amount: Float

    loan_date: Date
    disbursement_date: Date

    paid_installments: Int
    first_payments_date: Date
    generate_payments_date: Date

    interest_rate: Float
    term: String
    status: String
    payment_interval: String

    description: String
    purpose: String
    collateral: String
    progress:Int
    next_payment_date: Date
    last_payment_date: Date

    paid_amount: Float
    left_amount: Float

    payment_due_day: Int

    late_fee_rate: Float
    late_fee_amount: Float

    notes: String

    user: User
    payments: [Payment]

    created_at: DateTime
    updated_at: DateTime
  }

  type PaginationFilterLoans {
    pagination: Pagination
    data: [Loan]
  }



  input DisbursementDate{
    from:String
    to:String
  }

  input Installments {
    from:Int
    to:Int
  }

  input Amount {
    from:Int
    to:Int
  }
  
  input LoansFilter {
  status:[String]
  order:String 
disbursementDate:DisbursementDate
amount:Amount
installments:Installments
  
}
`;

export const loanQueries = gql`
  extend type Query {
    getClientLoans(clientId: ID!,filter:LoansFilter): PaginationFilterLoans
  }
`;
