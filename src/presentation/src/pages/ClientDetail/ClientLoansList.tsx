import React, { useState } from "react";
import { useLoanStore } from "../../store/loan.store";
import type { ILoan } from "../../types/general";
import { usePaymentStore } from "../../store/payment.store";
import LoanCard from "../../components/loans/LoanCard";
import { TrendingUp } from "lucide-react";
import { AddLoanModal } from "./AddLoanModal";
import LoanFilterDropdown2 from "./LoansFilter";

export default function ClientLoansList() {
  const { loans } = useLoanStore();

  const { payments } = usePaymentStore();


/*   const getLoanProgress = (loan: ILoan) => {
    const loanPayments = payments.filter((p) => p.loan === loan._id);
    const paidPayments = loanPayments.filter((p) => p.status === "paid");
    return {
      total: loanPayments.length,
      paid: paidPayments.length,
      percentage: (paidPayments.length / loanPayments.length) * 100,
      amountPaid: paidPayments.reduce((sum, p) => sum + p.amount, 0),
      amountPending: loanPayments
        .filter((p) => p.status !== "paid")
        .reduce((sum, p) => sum + p.amount, 0),
    };
  };
 */


  return (
    <div className="max-w-[80vw] md:max-w-[87vw] lg:max-w-[90vw] xl:max-w-[92vw] overflow-visible">
       
      {loans.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center   ">
        
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            Este cliente no tiene préstamos aún
          </p>
          <div className="flex justify-center">
            <AddLoanModal></AddLoanModal>
          </div>
        </div>
      )}
      {loans.length ? (
        <div className="bg-white rounded-xl p-6 border border-gray-200 overflow-visible">
            
          <div className="flex gap-2 justify-between overflow-visible">
            <div className="flex gap-3 justify-center items-center">
              <h3 className="text-gray-900 ">Préstamos ({loans.length})</h3>
              {/*  <LoanStatusFilter ></LoanStatusFilter> */}
                <LoanFilterDropdown2
              
            />
            </div>
           
          </div>

          {/* Carrusel horizontal de préstamos */}
          <div className=" max-h-105 overflow-x-scroll overflow-y-hidden pr-2">
            <div className="flex gap-4 p-5" style={{ minWidth: "min-content" }}>
              {loans.map((loan) => {
            
                //const progress = getLoanProgress(loan);
                return (
                  <div key={loan._id} className="relative">
                    <LoanCard loan={loan}></LoanCard>
                  </div>
                );
              })}
            </div>
          </div>

          {/* {loans.length > 1 && (
          <p className="text-sm text-gray-500 text-center mt-2">← Desliza para ver más préstamos →</p>
        )} */}
        </div>
      ) : (
        <></>
      )}



    </div>
  );
}

