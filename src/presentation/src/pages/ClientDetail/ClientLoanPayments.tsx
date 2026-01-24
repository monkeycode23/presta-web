import React, { useEffect } from "react";
import PaymentsList from "../../components/payments/PaymenstList";
import { CreditCard, TrendingUp } from "lucide-react";
import { useLoanStore } from "../../store/loan.store";
import { usePaymentStore } from "../../store/payment.store";
import Pagination from "../../components/Pagination";
import PaymentFilterDropdown from "./PaymentsFilter";
import { usePaginationFilterStore } from "../../store/pagination.filter";
import { useClientStore } from "../../store/client.store";

export default function ClientLoanPayments() {
  // const {currentLoan:selectedLoan,loans} = useLoanStore();
  const { payments } = usePaymentStore();
  const { pagination, filters ,setPage} = usePaginationFilterStore();
  const {selectedClient} = useClientStore()

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [pagination.payments])
  

  return (
    <>
      {selectedClient?.statics.payments.total  ? (
        <div className="min-h-[300px] bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between  gap-3  items-center mb-4">
           <div>
            
            <h3 className="text-gray-900 ">Cronograma de Pagos</h3>
            <PaymentFilterDropdown></PaymentFilterDropdown>
            </div> 
            <div className="flex gap-2 justify-center items-end">

               <span>
                {pagination.payments.pageSize}
                /pag 
                
                 total: {pagination.payments.total}
               </span>
                <Pagination  name={"payments"} changePage={(page:number)=>{
                setPage(page,"payments")
            }}></Pagination>
            </div>
                      
          </div>

          <div className="w-full  gap-2">
            {payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <div className="p-4 rounded-full bg-gray-100 mb-4">
                  <CreditCard className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">
                  No se encontraron pagos
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  No se encntraron resultados de pagos
                </p>
              </div>
            ) : (
              <PaymentsList></PaymentsList>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
