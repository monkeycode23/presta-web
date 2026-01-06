import { gql } from "graphql-tag";

export const ClienttypeDefs = gql`


  enum ClientStatus {
    ACTIVE
    BLOCK
    INACTIVE
  }
scalar Date
scalar ObjectId

type Amounts {
  total_left: Float!
  total_lend: Float!
  total_paid: Float!
  net_gain: Float!
  brute_gain: Float!
}

type LoanStats {
  total_loans: Int!
  total_active_loans: Int!
  total_completed_loans: Int!
  total_cancelled_loans: Int!
}

type PaymentStats {
  total_payments: Int!
  total_pending_payments: Int!
  total_expired_payments: Int!
  total_paid_payments: Int!
  total_incomplete_payments: Int!
}

type ClientStatics {
  amounts: Amounts!
  loans: LoanStats!
  payments: PaymentStats!
  reputation: Float!
  total_debt: Float!
}

type Client {
  _id: ObjectId!
  nickname: String!
  name: String
  lastname: String
  email: String
  phone: String
  address: String

  status: String! # "activo" | "inactivo" | "pendiente" | "bloqueado"

  gender: String
  birthdate: String
  document_id: Int

  cbu: String
  aliasCbu: String

  codigoAcceso: String!
  password: String

  email_verified: Boolean!
  phone_verified: Boolean!
  document_verified: Boolean!

  notes: String
  isConnected: Boolean

  loans: [ObjectId!]!
  user: ObjectId

  created_at: Date!
  updated_at: Date!

  client_since: Date!

  statics: ClientStatics!
}

  

  type PaginationFilterClients {
    pagination: Pagination
    data: [Client]
  }
  
  input ClientsFilter {
  nickname: String!
  loans: [String]
  payments:[String]
}

`;

export const clientQueries = gql`
  extend type Query {
    getClienteById(clientId: ID!): Client
    getFilterClients(userId:ID0!,filter:ClientsFilter,pagination:PaginationFilter): PaginationFilterClients
   
  }
`;
 