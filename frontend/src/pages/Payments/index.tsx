import React, { useEffect, useState } from "react";


import Calendar from "./Calendar";
import { PaymentsList } from "./PaymentsList";
import DayResume from "./DayResume";
import { useQuery, useLazyQuery } from "@apollo/client/react";


    
import { GET_PAYMENTS, type GetPaymentsResponse, type GetPaymentsVars2 } from "../../graphql/payments.queries";
import { useAuthStore } from "../../store/auth.store";
import { usePaginationFilterStore } from "../../store/pagination.filter";
import { usePaymentStore } from "../../store/payment.store";


export function PaymentsCalendar() {


    const [paymentsStatus, setPaymentsStatus] = useState<any>([]);
      const [getPayments, { data, loading, error }] = useLazyQuery<
    GetPaymentsResponse,
    GetPaymentsVars2
  >(GET_PAYMENTS, {
    fetchPolicy: "network-only", // 🔥
  });

  const {filters,setFilters,pagination,setPagination} = usePaginationFilterStore();

  const {setPayments } = usePaymentStore()
  const authStore = useAuthStore()


  useEffect(() => {
    
    setFilters({
        status:[],
         clientId:"",
         loanId:"",
         client:"",
        order:"newest",
        payment_date:{
            to:"",
            from:"",
            exact:new Date().toISOString().split("T")[0]
        }
    },"payments_date")
  
    return () => {
      
    }
  }, [])
  

    useEffect(() => {
    if (!authStore.user) return;


    

    const fetch = async () => {
      console.log(filters);
      
      const response: any = await getPayments({
        variables: {
          
          filter: filters.payments_date,
          pagination: {
            page: pagination.payments_date.page,
            limit: 5,
          },
        },
      });

  
      if (data) {
        const {data:payments,pagination:_pagination } = data.getPayments;

      
        console.log(payments)

        setPayments(payments)


        setPagination({
            total:_pagination.total,
            totalPages:_pagination.totalPages,
            pageSize:_pagination.limit
            
        },"payments_date")

      /*   setClients(clients ?? []);
        setTotal(_pagination.total); */
        
      }
    };

    /*  if (!clients.length)  */ fetch();

    return () => {
      console.log("asdasdas");
    };
  }, [authStore.user, data, filters,pagination.payments_date?.page]);


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Calendario de Pagos</h2>
        <p className="text-gray-600">
          Visualiza y gestiona los pagos por fecha
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de pagos del día - IZQUIERDA */}
         <div className="lg:col-span-2 space-y-4">
            <DayResume ></DayResume>
            <PaymentsList></PaymentsList>
         </div>
        {/* Calendario - DERECHA */}
        
        <Calendar ></Calendar>
        
      </div>
    </div>
  );
}



