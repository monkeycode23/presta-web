


import React, { useEffect } from 'react'

import { formatCurrency } from '../../common/funcs';
import { usePaymentStore } from '../../store/payment.store';
import { usePaginationFilterStore } from '../../store/pagination.filter';

export default function DayResume() {



    const {payments:_,paymentsStatus} = usePaymentStore()
    const {filters} = usePaginationFilterStore()
    
    const {payments_date} = filters;

    console.log(filters)

    const selectedDate = payments_date ?  payments_date.payment_date?.exact : new Date() 

        console.log(selectedDate,"asdlakshdkajsdh")
const selectedDatePayments = paymentsStatus.find((p)=>{

    console.log(selectedDate)
    return p._id == selectedDate.split("T")[0]
})

      const selectedDateStats = {
    total: selectedDatePayments?.total ?? 0,
    pagadas: selectedDatePayments?.paid ?? 0,
     incompletos: selectedDatePayments?.incomplete ?? 0,
    vencidas: selectedDatePayments?.expired ?? 0,
    pendientes: selectedDatePayments?.pending ?? 0,
    totalAmount:selectedDatePayments?.totalAmount ?? 0
    /*  selectedDatePayments.reduce((sum, p) => sum + p.amount, 0) */,
    collectedAmount: selectedDatePayments?.paidAmount ?? 0/* selectedDatePayments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0), */
  };


  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  

  return (
     <div className="lg:col-span-2 space-y-4">
          {/* Resumen del día */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">
               {selectedDate && selectedDate} ({selectedDateStats.total})
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Pendientes</p>
                <p className="text-blue-600">
                  {selectedDateStats.pendientes}
                </p>
              </div>
               <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Pagadas</p>
                <p className="text-green-600">{selectedDateStats.pagadas}</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Incompletos</p>
                <p className="text-yellow-900">{selectedDateStats.incompletos}</p>
              </div>
             
             
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Vencidas</p>
                <p className="text-red-600">{selectedDateStats.vencidas}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monto Total</span>
                <span className="text-gray-900">
                  ${formatCurrency(selectedDateStats.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Recaudado</span>
                <span className="text-green-600">
                  ${formatCurrency(selectedDateStats.collectedAmount)}
                </span>
              </div>
            </div>
          </div>

       {/*    <PaymentsList
            selectedDatePayments={selectedDatePayments}
          ></PaymentsList> */}
        </div>
  )
}
