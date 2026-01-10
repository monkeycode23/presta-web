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

export const GET_CLIENTS = gql`
  query getFilterClients(
    $userId: ID!
    $filter: ClientsFilter
    $pagination: PaginationFilter
  ) {
    getFilterClients(
      userId: $userId
      filter: $filter
      pagination: $pagination
    ) {
      pagination {
        page
        limit
        totalPages
        total
        skip
      }
      data {
        _id
        name
        lastname
        address
        phone
        email
        client_since
        nickname
        created_at
        statics {
          loans {
          total
          active
          completed
          canceled
        }
        payments {
          total
          pending
          paid
          expired
          incomplete
        }
        }
      }
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($clientId: ID!) {
    getClient(clientId: $clientId) {
      _id
      name
      lastname
      address
      phone
      email
      client_since
      nickname
      created_at
      statics {
        loans {
          total
          active
          completed
          canceled
        }
        payments {
          total
          pending
          paid
          expired
          incomplete
        }
        amounts {
        total_lent 
        total_paid
        client_debt
       
      }
      
      }
    }
  }
`;

export interface GetClientResponse {
  getClient: IClient;
}

export interface GetClientVars {
  clientId: string;
}
