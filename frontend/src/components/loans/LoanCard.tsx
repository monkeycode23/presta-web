import React, { useState, useRef, useEffect } from "react";

import Modal from "../Modal";
import DeleteLoanModal from "../../pages/ClientDetail/DeleteLoanModal";
//components
/* import {
  SackDollar,
  CalendarDateIcon,
  BaselineFactCheck,
  BaselineAssignment,
  DeleteIcon,
} from "../../Icons"; */

import Dropdown from "../../components/Dropdowns/Dropdown";

import { Link } from "react-router";
import Tooltip from "../ToolTip";
import { Calendar, DollarSign, Pencil, Trash2, MoreHorizontal, } from "lucide-react";
import { BaselineAssignment, BaselineFactCheck } from "../payments/PaymentCard";
import { useLoanStore } from "../../store/loan.store";

export const formatAmount = (value: number): string => {
  return new Intl.NumberFormat("es-ES").format(value);
};




const LoanCard = ({ loan }: any) => {
  const { setCurrentLoan, currentLoan } = useLoanStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalPaid = loan.total_paid ?? 0;
  const progress = Math.min(100, Math.round((loan.paid_amount / loan.total_amount) * 100));
    const {updateFilterValue,filters} = usePaginationFilterStore()
  
  return (
    <div
      data-active={currentLoan?._id === loan._id}
        onClick={() => {
        if (currentLoan?._id !== loan._id) {
          setCurrentLoan(loan);
          updateFilterValue("payments",{
            ...filters.payments,
            loanId:loan._id
          })
        } else {

            setCurrentLoan(null);
         updateFilterValue("payments",{
            ...filters.payments,
            loanId:""
          })
        }
        
       
      }}
      className={`
        w-xl sm:w-md md:md lg:w-md
        relative  p-4 rounded-xl text-white
        transition-all duration-200
        ${
          loan.status === "active"
            ? "bg-blue-500"
            : loan.status === "completed"
            ? "bg-green-500"
            : "bg-red-500"
        }
        data-[active=true]:ring-4 data-[active=true]:ring-blue-800
         text-white p-4 rounded-xl relative
        transition-all duration-200 ease-in-out
        ring-0 ring-transparent shadow-sm
        data-[active=true]:shadow-xl
        data-[active=true]:z-50
        data-[active=true]:scale-[1.07]
          `}
    >
      {/* MORE MENU */}
      <div className="absolute top-4 right-4 z-50">
        <button
        title="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1 rounded hover:bg-white/20"
        >
          <MoreHorizontal size={20} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2  bg-white text-gray-700 rounded-lg shadow-lg">
            <OptionsDropDown></OptionsDropDown>
          </div>
        )}
      </div>

      {/* HEADER */}
      <div className="flex gap-4 items-start">
        {/* ICON + STATUS */}
        <div className="flex flex-col items-center mt-2">
          <div className="bg-white/30 rounded-lg p-2">
            <DollarSign size={18} />
          </div>
          <span className="text-xs font-semibold mt-1 opacity-90">
            {loan.status}
          </span>
        </div>

        {/* LABEL + AMOUNT */}
        <div className="flex-1 pr-12">
         
        <h1 className="text-3xl font-bold leading-tight mt-1">
          ${formatAmount(loan.amount)}
        </h1>

       
           <p className="flex gap-3 text-sm font-semibold opacity-90">
            {loan.label}  <p className="text-sm text-green-200 font-semibold">
          + ${formatAmount(loan.interest_amount)} interés
        </p>
          </p>


          
        </div>
      </div>

      {/* INTEREST + PERIOD */}
      <div className="flex gap-4 text-sm mt-3 opacity-90">
        <span>
          Interés: <b>{loan.interest_rate}%</b>
        </span>
        <span>
          Período: <b>{loan.payment_interval}</b>
        </span>
        <div className="flex items-center gap-2 text-sm opacity-90 ">
            <Calendar size={14} /> 
            <b>{loan.disbursement_date.split("T")[0]}</b>
          </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="flex gap-3">Pagado

            <b>{loan.paid_installments}/{loan.installment_number}</b>
          </span>
          <span>{progress}%</span>
          
        </div>

        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-xs mt-1 opacity-90">
          <div className="flex gap-5">
            <span>${formatAmount(loan.paid_amount)} </span>
            <span> deuda ${formatAmount(loan.left_amount)}</span>
          </div>
          <span>${formatAmount(loan.total_amount)}</span>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;


const OptionsDropDown = () => {



  return (
    
      <ul className="">
        <li>
          <button
            className="
              flex items-center gap-3
              w-full px-4 py-2
              hover:bg-gray-100
              transition
            "
          >
            <Pencil size={16} className="text-gray-500" />
            Editar
          </button>
        </li>
        <DeleteLoanModal></DeleteLoanModal>
        <li>
         
        </li>
      </ul>
  );
};



import { createPortal } from "react-dom";
import { usePaginationFilterStore } from "../../store/pagination.filter";

function DropdownPortal({children}:any) {
  const portalRoot = document.getElementById("root");
  return createPortal(children, portalRoot as Element);
}
/* 
 <DropdownDefault
        className={`font-bold text-xl absolute top-0 left-10 p-2 
        hover:cursor-pointer text-white`}
      >
        {/* <EditLoanModal
                loan={loan}
                label={"Editar prestamo"}
                button={
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <EditIcon className="w-4 h-4" />
                    Editar Prestamo
                  </button>
                }
              /> 
        <button
          onClick={async () => {
           
            deleteLoanDb()

            deleteLoanApi()
          }}
          className="flex items-center gap-2  text-sm font-medium text-black bg-white border  hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <DeleteIcon className="w-4 h-4" />
          Borrar Prestamo
        </button>
      </DropdownDefault>

*/




