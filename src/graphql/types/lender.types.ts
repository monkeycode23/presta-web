


import { gql } from "graphql-tag";


export const LendertypeDefs = gql`

    type Role{
        name:String
        permissions:[String]
    }

   type Lender {
    _id: ID!
    name: String
    phone: String
    email: String
    user:User
    clients:[Client]
    Employees:[String]
    Activities:[String]
  }
  


  type PaginationFilterlender {
    pagination: Pagination
    data: [Lender]
  }

  
`;



export const lenderQueries = gql`
  extend type Query {
    getUserLender(userId: ID!): Lender
  }
`;


