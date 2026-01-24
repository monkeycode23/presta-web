
import { gql } from "@apollo/client";

import type{ IClient,ILoan } from "../types/general";



export interface GetLoansResponse {
  getClientLoans: {
    pagination:any
    data:ILoan[]
  };
}

export interface GetLoansVars {
  clientId: string;
  filter:any;

}

export const GET_CLIENT_LOANS = gql`
  query getClientLoans($clientId: ID!,$filter: LoansFilter) {
    getClientLoans(clientId: $clientId,filter: $filter) {
        
      data {
        _id
        label
      amount
      total_amount
      payment_interval
      disbursement_date
      first_payments_date
      paid_installments
      left_amount
      paid_amount
      interest_rate
      interest_amount
      status
      installment_number
      progress
      
      }
    }
  }
`;

/* export const GET_CLIENT = gql`
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
      statics{
        loans{
            total
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
 */