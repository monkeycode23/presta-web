import { gql } from "@apollo/client";

import type { IPayment } from "../types/general";

export interface GetPaymentsResponse {
  getClientPayments: {
    pagination: any;
    data: IPayment[];
  };
}

export interface GetPaymentsVars {
  clientId: string;
  filter: any;
  pagination: any;
}

export const GET_CLIENT_PAYMENTS = gql`
  query getClientPayments(
    $clientId: ID!
    $filter: PaymentsFilter
    $pagination: PaginationFilter
  ) {
    getClientPayments(
      clientId: $clientId
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
        amount
        status
        total_amount
        paid_amount
        left_amount
        incomplete_amount
        paid_date
        payment_date
        interest_amount
        label
        processed_by{
            _id
            avatar
            username
        }
        loan{
            
            amount
            payment_interval
         
        }
        client{
            nickname
        }
     
      }
    }
  }
`;

/* export const GET_Payment = gql`
  query getPayment($PaymentId: ID!) {
    getPayment(PaymentId: $PaymentId) {
      _id
      name
      lastname
      address
      phone
      email
      Payment_since
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
        Payment_debt
       
      },
      
      }
    }
  }
`;

export interface GetPaymentResponse {
  getPayment: IPayment;
}

export interface GetPaymentVars {
  PaymentId: string;
}
 */