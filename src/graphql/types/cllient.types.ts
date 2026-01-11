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
  client_debt: Float!
  total_lent: Float!
  total_paid: Float!
  net_gain: Float!
  brute_gain: Float!
  
}

type LoanStats {
  total: Int!
  active: Int!
  completed: Int!
canceled: Int!
}

type PaymentStats {
    total:Int!
  payments: Int!
  pending: Int!
  expired: Int!
  paid: Int!
  incomplete: Int!
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
  client_since:Date
  created_at: Date!
  updated_at: Date!
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
    getClient(clientId: ID!): Client
    getFilterClients(userId:ID!,filter:ClientsFilter,pagination:PaginationFilter): PaginationFilterClients
   
  }
`;
 