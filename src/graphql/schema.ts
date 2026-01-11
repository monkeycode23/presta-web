import { gql } from "graphql-tag";
import { userQueries,UsertypeDefs } from "./types/user.types";
import { ClienttypeDefs,clientQueries } from "./types/cllient.types";
import { LendertypeDefs,lenderQueries } from "./types/lender.types";
import { LoanTypeDefs,loanQueries } from "./types/loan.types";
import { paymentQueries, PaymentTypeDefs } from "./types/payment.types";
export const typeDefs = gql`

type Query

  scalar Date
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
   ${PaymentTypeDefs}
   ${LendertypeDefs}
  ${LoanTypeDefs}
 

input PaginationFilter {
  page:Int
  limit:Int
}
  ${userQueries}
  ${clientQueries}
${lenderQueries}
${paymentQueries}
${loanQueries}
`;
