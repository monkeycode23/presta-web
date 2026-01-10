import React from 'react'
import PaymentsList from '../../components/payments/PaymenstList'
import { TrendingUp } from 'lucide-react'
import { useLoanStore } from '../../store/loan.store'
import { usePaymentStore } from '../../store/payment.store'
import Pagination from '../../components/Pagination'
import PaymentFilterDropdown from './PaymentsFilter'
import { usePaginationFilterStore } from '../../store/PaginationFilter'


export default function ClientLoanPayments() {

   // const {currentLoan:selectedLoan,loans} = useLoanStore();
    const {payments} = usePaymentStore();
    const {pagination}  = usePaginationFilterStore(); 
    
  return (
    <>
    {payments.length  ? (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className='flex  gap-3  items-center mb-4'>
            <h3 className="text-gray-900 ">Cronograma de Pagos</h3>
            <PaymentFilterDropdown></PaymentFilterDropdown>
          </div>
           <div className='w-full  gap-2'>
            <PaymentsList ></PaymentsList>
    </div>
        </div>
      ):(<></>)}

      
    </>
  )
}
