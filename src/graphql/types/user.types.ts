


import { gql } from "graphql-tag";


export const UsertypeDefs = gql`

    type Role{
        name:String
        permissions:[String]
    }

   type User {
    _id: ID!
    avatar: String
    username: String
    email: String
    passwordHash: String
    roles: [Role]
    emailVerified: Boolean
  }
  


  type PaginationFilterClassrooms {
    pagination: Pagination
    data: [User]
  }

  
`;



export const userQueries = gql`
  extend type Query {
    getAuthUser(userId: ID!): User
  }
`;


