import React, { useEffect, useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import type { Loan, PaymentFrequency } from "../../types/general";
import Modal from "../../components/Modal";
import { useForm } from "../../hooks/useForm";
import { CreateLoanSchema } from "../../errors/schemas/loan.schema";
import ErrorMessage from "../../components/InputErrorMessage";
import { useClientStore } from "../../store/client.store";
import { useLoanStore } from "../../store/loan.store";
import { usePaymentStore } from "../../store/payment.store";

import { EditLoanSchema } from "../../errors/schemas/loan.schema";
import { useModalStore } from "../../store/modal.store";
import useFormStore from "../../store/form2.store";
/* interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (loan: Omit<Loan, 'id' | 'clientId'>) => void;
}
 */

type PaymentInterval = 
"unique"
     | "daily"
      |"weekly"
      |"monthly"
      |"fortnightly"
      |"custom"

export function EditLoanModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const clientStre = useClientStore()
  const loanStore = useLoanStore()
  const {currentLoan} = loanStore
  const paymentStore = usePaymentStore()
  const {selectedClient} = useClientStore()
    const MODAL_NAME = "EDIT_LOAN"

    const {setForm} = useFormStore()

    const {openModal,setModal,modals,closeModal,} = useModalStore()

    //const initialValues = React.useMemo(() => (), [currentLoan]);

    console.log(currentLoan)
  const {
    values,
    errors,
    loading,
    setValue,
    handleSubmit: _handleSubmit,
  } = useForm({
    name: MODAL_NAME ,
    schema: EditLoanSchema,
    initialValues:{
  amount: currentLoan?.amount ?? "",
  interest_rate: currentLoan?.interest_rate ?? "",
  payment_interval: currentLoan?.payment_interval ?? "monthly",
  installments: currentLoan?.installment_number ?? "",
  disbursement_date: currentLoan?.disbursement_date ?? "",
  first_payment_date: currentLoan?.first_payments_date ?? "",
},
  });

  

useEffect(() => {
  setModal(MODAL_NAME)
}, [])
  


  const calculateTotal = () => {
    const amount = Number(values.amount) || 0;
    const interest = Number(values.interest_rate) || 0;
    return amount + (amount * interest) / 100;
  };

   const calculateCuota = () => {
    const amount = Number(values.amount) || 0;
    const interest = Number(values.interest_rate) || 0;
    const total = amount + (amount * interest) / 100;
    return Math.floor(total / values.installments!)
  };

   const calculateInterest = () => {
    const amount = Number(values.amount) || 0;
    const interest = Number(values.interest_rate) || 0;
    return (amount * interest) / 100;
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const total_amount = calculateTotal();

  _handleSubmit(
    {
      url: "/loans",
      method: "POST",
    },
    (data: any) => {
      console.log(data);

      loanStore.addLoan(data.data.loan);
      

      const payments = data.data.payments.map((p:any)=>{
        return {
            ...p,
            loan:{
                total_amount,
                amount:values.amount,
                payment_interval:values.payment_interval
                
            }
        }
      })

      
      paymentStore.setPayments(payments);

      if (clientStre.selectedClient) {
        const statics = clientStre.selectedClient.statics;

        // Actualizamos el cliente con los nuevos datos de statics
        clientStre.updateClient(clientStre.selectedClient._id, {
          statics: {
            ...statics,
            loans: {
              ...statics.loans,
              total: statics.loans.total + 1,
              active: statics.loans.active + 1,
            },
            payments: {
              ...statics.payments,
              total: statics.payments.total + values.installments!,
              pending: statics.payments.pending + values.installments!,
            },
            amounts: {
              ...statics.amounts,
              client_debt: Number(statics.amounts.client_debt) + calculateTotal(),
              total_lent:Number( statics.amounts.total_lent) + Number(values.amount),
            },
          },
        });
      }

      setIsModalOpen(false);
    }
  );
};

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", ).format(value);
  };


  

  return (
    <>

  {/*  <button
        onClick={(event) => {
             event.stopPropagation(); 
            
            setIsModalOpen(true)}}
        className="
              flex items-center gap-3
              w-full px-4 py-2
             
              transition
            "
      >
        <Pencil size={16} />
        Editar
      </button>
 */}
      <Modal open={modals[MODAL_NAME] && modals[MODAL_NAME].isOpen}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Editar Préstamo</h3>
          <button
            title={"new"}
            onClick={() => {
              closeModal(MODAL_NAME);
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Monto del préstamo *
            </label>
            <input
              type="number"
              
              min="10000"
              step="1000"
              value={values && values.amount }
              onChange={(e) => setValue("amount", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5000.00"
            />
            {errors && errors.amount && <ErrorMessage message={errors.amount} />}
          </div>

          <div className="flex gap-1">
            <div>
            <label className="block text-sm text-gray-700 mb-1">
              Tasa de interés (%) *
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={values && values.interest_rate}
              onChange={(e) => setValue("interest_rate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15"
            />
            {errors && errors.interest_rate && (
              <ErrorMessage message={errors.interest_rate} />
            )}
          </div>

            <div>
            <label className="block text-sm text-gray-700 mb-1">
              Número de cuotas *
            </label>
            <input
              type="number"
              
              min="1"
              value={values && values.installments}
              onChange={(e) => setValue("installments", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
            { errors &&  errors.installments && (
              <ErrorMessage message={errors.installments} />
            )}
          </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Modalidad de pago *
            </label>
            <select
              title="interval"
              value={values && values.payment_interval}
              onChange={(e) => setValue("payment_interval", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="unique">Unica</option>
              <option value="daily">Diaria</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="fortnightly">Quincenal</option>
              <option value="custom">Indefinida</option>
            </select>
           
          </div>

        

          <div className="flex gap-1">
            <div className="w-full">
              <label className="block text-sm text-gray-700 mb-1">
                Fecha de desembolso *
              </label>
              <input
                title="date"
                type="date"
              
                value={values && values.disbursement_date}
                onChange={(e) => setValue("disbursement_date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm text-gray-700 mb-1">
                Fecha Inicio Pagos *
              </label>
              <input
                title="date"
                type="date"
              
                value={values && values.first_payment_date}
                onChange={(e) => setValue("first_payment_date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
             
            </div>

            
            
          </div>
          <div>
             { errors && errors.payment_interval && (
              <ErrorMessage message={errors.payment_interval} />
            )}
             { errors && errors.first_payment_date && (
              <ErrorMessage message={errors.first_payment_date} />
            )}
          </div>

          {values && values.amount && values.interest_rate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Monto del préstamo:
                </span>
                <span className="text-gray-900">
                  {formatCurrency(values.amount)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Intereses ({values.interest_rate}%):
                </span>
                <span className="text-gray-900">
                  {formatCurrency(calculateInterest())}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-gray-900">Total a pagar:</span>
                <span className="text-green-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
              {values.installments && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">
                    Cuota {values.payment_interval}:
                  </span>
                  <span className="text-gray-900">
                    {(formatCurrency(calculateCuota()))}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                closeModal(MODAL_NAME);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Editar Préstamo
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
