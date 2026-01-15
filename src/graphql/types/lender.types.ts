import { gql } from "graphql-tag";

export const LendertypeDefs = gql`
  type Role {
    name: String
    permissions: [String]
  }

  type Lender {
    _id: ID!
    name: String
    lastname: String
    nickname: String
    phone: String
    email: String
    address:String
    business: String
    user: User
    clients: [Client]
    Employees: [String]
    Activities: [String]
    created_at:String
    statics: LenderStatics
  }

  type LenderStatics {
    clients: StaticsClients
    loans: StaticsLoans
    payments: StaticsPayments
    amounts: StaticsAmounts
  }

  type StaticsClients {
    total: Int
    active: Int
  }

  type StaticsLoans {
    total: Int
    active: Int
    completed: Int
    canceled: Int
    pending: Int
  }

  type StaticsPayments {
    total: Int
    active: Int
    completed: Int
    canceled: Int
    pending: Int
  }

  type StaticsAmounts {
    total_lent: Int
    total_clients_deb: Int
    total_interest: Int
  }

  type LenderResponse {
    
    data: Lender
  }
`;

export const lenderQueries = gql`
  extend type Query {
    getLender(userId: ID!): LenderResponse
  }
`;
