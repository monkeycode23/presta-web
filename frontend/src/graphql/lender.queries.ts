import { gql } from "@apollo/client";

import type { IClient } from "../types/general";

export interface GetClientsResponse {
  getFilterClients: {
    pagination: any;
    data: IClient[];
  };
}

export interface GetClientsVars {
  userId: string;
  filter: any;
  pagination: any;
}

export const GET_LENDER_STATICS = gql`
  query getFilterClients($lenderId: ID!) {
    getLenderStatics(lenderId: $lenderId) {

         activeLoans
        overduePayments
        totalCollected
        totalPending
        weeklyCollected
    }
  }
`;

export const GET_LENDER = gql`
  query getLender($userId: ID!) {
    getLender(userId: $userId) {
      _id
      name
      lastname
      address
     

    }
  }
`;

export interface GetLenderResponse {
  getLender:{
    data:any
  }
}

export interface GetLenderVars {
  userId: string;
}
