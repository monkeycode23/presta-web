import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, DollarSign, Plus, X, XCircle } from "lucide-react";
import type { Loan, PaymentFrequency } from "../../types/general";
import Modal from "../../components/Modal";
import { useForm } from "../../hooks/useForm";
import { CreateLoanSchema } from "../../errors/schemas/loan.schema";
import ErrorMessage from "../../components/InputErrorMessage";
import { useClientStore } from "../../store/client.store";
import { useLoanStore } from "../../store/loan.store";
import { usePaymentStore } from "../../store/payment.store";
import { useModalStore } from "../../store/modal.store";


/* interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (loan: Omit<Loan, 'id' | 'clientId'>) => void;
}
 */
export function ViewPaymentModal() {
  //const [isModalOpen, setIsModalOpen] = useState(false);
 
  const {modals,setModal,openModal,closeModal} = useModalStore()

  const clientStre = useClientStore()
  const loanStore = useLoanStore()
  const paymentStore = usePaymentStore()
  const {selectedClient} = useClientStore()
    const MODAL_NAME = "VIEW_PAYMENT"

useEffect(() => {
  

    setModal(MODAL_NAME)

  return () => {
    
  }
}, [])


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", ).format(value);
  };

  return (
    <>
     

      <Modal open={
       modals[MODAL_NAME] && modals[MODAL_NAME].isOpen
      }>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">{paymentStore.currentPayment?.label}</h3>
          <button
            title={"new"}
            onClick={() => {
               closeModal(MODAL_NAME)
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
           <PaymentDetailsCard ></PaymentDetailsCard>
       
      </Modal>
    </>
  );
}



import {

  FileText,
Calendar,
  Percent,
} from "lucide-react";

export default function PaymentDetailsCard() {

    const {currentPayment:payment} = usePaymentStore()


  const getStatusIcon = () => {
    if(!payment) return 
    if (payment.status === "paid")
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (payment.status === "expired")
      return <XCircle className="w-5 h-5 text-red-600" />;
    if (payment.status === "pending")
      return <Clock className="w-5 h-5 text-blue-600" />;
    if (payment.status === "incomplete")
      return <Clock className="w-5 h-5 text-yellow-600" />;
  };

  if(!payment) return 

  return (
    <div className="bg-white rounded-xl shadow-lg w-full">
      {/* HEADER */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="font-semibold capitalize text-gray-700">
            {payment.status}
          </span>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-lg font-bold">
            <DollarSign className="w-4 h-4 text-gray-500" />
            {payment.amount}
          </div>

          {payment.interest_amount > 0 && (
            <div className="flex items-center justify-end gap-1 text-sm text-green-600">
              <Percent className="w-3 h-3" />
              Interés: ${payment.interest_amount}
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="p-4">
        <div className="flex border-b mb-4">
          <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-600">
            Detalles
          </button>

          {!payment.notes && (
            <button className="px-4 py-2 text-sm font-medium text-gray-500 flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Notas
            </button>
          )}
        </div>

        {/* TAB CONTENT */}
        <div className="space-y-3 text-sm">
          <DetailRow  label="Monto pagado" value={payment.paid_amount} />
          <DetailRow  label="Monto restante" value={payment.left_amount} />

          <DetailRow
            label="Fecha de pago"
            value={payment.paid_date?.split("T")[0] || "—"}
            icon={<Calendar className="w-4 h-4" />}
          />

          <DetailRow
            label="Fecha de expiración"
            value={payment.payment_date.split("T")[0]}
            icon={<Calendar className="w-4 h-4" />}
          />

          {/* Estado del pago */}
          {payment.status === "paid" && (
            <div className="text-sm">
              {payment.late_days < 0 && (
                <span className="text-red-600 font-medium">
                  Pagado con {payment.late_days} días de atraso
                </span>
              )}
              {payment.late_days === 0 && (
                <span className="text-green-600 font-medium">
                  Pagado en fecha
                </span>
              )}
              {payment.late_days > 0 && (
                <span className="text-blue-600 font-medium">
                  Pagado {Math.abs(payment.late_days)} días por adelantado
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
     {payment.status == "paid" &&  <div className="p-4 border-t flex items-center gap-3">
         <img
          src={payment.processed_by!.avatar ?? ""}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        /> 
        <div>
          <p className="text-sm ">
            Procesado por <b>{payment.processed_by!.username ?? ""}</b>
          </p> 
          <p className="text-xs text-gray-500">
             {payment.processed_by?.email ?? ""} 
          </p>
        </div>
      </div>}
    </div>
  );
}

function DetailRow({ label, value, icon }:any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-gray-500">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
