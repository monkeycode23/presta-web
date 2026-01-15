import { gql } from "@apollo/client";

import type { IPayment } from "../types/general";

export interface GetPaymentsResponse {
  getPayments: {
    pagination: any;
    data: IPayment[];
  };
}

export interface GetPaymentsResponse2 {
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

        late_days
        processed_by{
            _id
            avatar
            username
            email
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




export interface GetPaymentsVars2 {
  filter: any;
  pagination: any;
}

export const GET_PAYMENTS = gql`
  query getPayments(
    
    $filter: PaymentsFilter2
    $pagination: PaginationFilter
  ) {
    getPayments(
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
        late_days
        processed_by{
            _id
            avatar
            username
             email
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




export const GET_PAYMENTS_STATUS = gql`
  query getPayments(
    
    $filter: PaymentsFilter2
    $pagination: PaginationFilter
  ) {
    getPayments(
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
        status
        payment_date
      }
    }
  }
`;




export interface GetPaymentsStatusResponse {
  paymentsStatus:any 
}

export interface GetPaymentsStatusVars {

  filter: any;

}



export const GET_PAYMENTS_STATUS2 = gql`
  query paymentsStatus(
    
    $filter: PaymentsStatusFilter
    
  ) {
    paymentsStatus(
      filter: $filter
    ) {
      _id
      total
      paid
      expired
      incomplete
      pending
      paidAmount
      totalAmount
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