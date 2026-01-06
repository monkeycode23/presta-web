import { gql } from "graphql-tag";
import { userQueries,UsertypeDefs } from "./types/user.types";
import { ClienttypeDefs,clientQueries } from "./types/cllient.types";


export const typeDefs = gql`

type Query

scalar DateTime


 type Pagination {
    totalPages: Int
    page: Int
    skip: Int
    limit: Int
    total:Int
  }

    type Tag {
    _id: ID!
    name: String!
    color: String
    icon: String
    text: String
  }

    ${UsertypeDefs}
   ${ClienttypeDefs}
 

input PaginationFilter {
  page:Int
  limit:Int
}
  ${userQueries}

`;
