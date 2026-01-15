import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import type { Loan, PaymentFrequency } from "../../types/general";
import Modal from "../../components/Modal";
import { useForm } from "../../hooks/useForm";
import { CreateLoanSchema } from "../../errors/schemas/loan.schema";
import ErrorMessage from "../../components/InputErrorMessage";
import { useClientStore } from "../../store/client.store";
import { useLoanStore } from "../../store/loan.store";
import { usePaymentStore } from "../../store/payment.store";
import useFormStore from "../../store/form2.store";
import { useModalStore } from "../../store/modal.store";
import { EditPaymentSchema } from "../../errors/schemas/payment.schema";

export function EditPaymentModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clientStre = useClientStore();
  const loanStore = useLoanStore();
  const paymentStore = usePaymentStore();
  const { selectedClient } = useClientStore();

  const { setForm, forms, submit, setValue: editValues } = useFormStore();

  const { modals, setModal, closeModal } = useModalStore();

  const FORM_NAME = "edit_payment";

  const {
    inputs: values,
    errors,
    loading,
  } = forms[FORM_NAME] ?? {
    inputs: {},
    errors: {},
    loading: false,
  };

  const { currentPayment } = paymentStore;

  useEffect(() => {
    if (!currentPayment) return;

    setModal(FORM_NAME);

    setForm(FORM_NAME, {
      inputs: {
        label: currentPayment.label,
        amount: currentPayment.amount,
        status: currentPayment.status,
        processed_by: currentPayment.processed_by ?? "",
        paid_date: currentPayment.paid_date ?? "",
        paid_amount: currentPayment.paid_amount ?? 0,
      },
      errors: {},
      loading: false,
    });

    return () => {};
  }, [currentPayment]);

  const setValue = (key: string, val: any) => {
    editValues(FORM_NAME, key, val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submit(
      FORM_NAME,
      {
        url: "/payments",
        method: "PUT",
      },
      EditPaymentSchema,
      (data:any) => {
        console.log(data);
      }
    );
    /*   _handleSubmit(
    {
      url: "/loans",
      method: "POST",
    },
    (data: any) => {
      console.log(data);

      loanStore.addLoan(data.data.loan); */

    /* const payments = data.data.payments.map((p:any)=>{
        return {
            ...p,
            loan:{
                total_amount,
                amount:values.amount,
                payment_interval:values.payment_interval
                
            }
        }
      }) */

    /*     paymentStore.setPayments(payments);

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
              total: statics.payments.total + values.installments,
              pending: statics.payments.pending + values.installments,
            },
            amounts: {
              ...statics.amounts,
              client_debt: Number(statics.amounts.client_debt) + calculateTotal(),
              total_lent:Number( statics.amounts.total_lent) + Number(values.amount),
            },
          },
        });
      }

      setIsModalOpen(false); */
    //}
    //);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES").format(value);
  };

  return (
    <>
    {/*   <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Edit
      </button> */}

      <Modal open={modals[FORM_NAME] && modals[FORM_NAME].isOpen}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Editar Pago</h3>
          <button
            title={"new"}
            onClick={() => {
              closeModal(FORM_NAME);
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* label */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={values && values.label}
              onChange={(e) => setValue("label", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="etiqueta del pago"
            />
            {errors && errors.label && <ErrorMessage message={errors.label} />}
          </div>
          {/* montooo */}
          {/* <div>
            <label className="block text-sm text-gray-700 mb-1">Monto</label>
            <input
              type="number"
              min="10000"
              step="1000"
              value={values && values.amount}
              onChange={(e) => setValue("amount", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5000.00"
            />
            {errors && errors.amount && (
              <ErrorMessage message={errors.amount} />
            )}
          </div>
 */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Estado</label>
            <select
              title="interval"
              value={values && values.status}
              onChange={(e) => setValue("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pendiente</option>
              {/* <option value="incomplete">Incompleto</option>
              <option value="paid">Pagado</option> */}
            </select>
          </div>

          {/*    {values.status == "paid" && (
            <div className="">
              <div className="w-full">
                <label className="block text-sm text-gray-700 mb-1">
                  Fecha del pago
                </label>
                <input
                  title="date"
                  type="date"
                  value={values && values.paid_date}
                  onChange={(e) => setValue("paid_date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  {errors && errors.paid_date && (
                    <ErrorMessage message={errors.paid_date} />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Pagado Por
                </label>
                <select
                  title="interval"
                  value={values && values.processed_by}
                  onChange={(e) => setValue("processed_by", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={""}>Yo</option>
                  <option value="incomplete">empleado1</option>
                  <option value="paid">empleado2</option>
                </select>
              </div>s
            </div>
          )} */}

          {/*  {values.status == "incomplete" && (
            <>
            
            <div className="flex gap-1">
              <div className="w-1/2">
                <label className="block text-sm text-gray-700 mb-1">
                  Fecha del pago
                </label>
                <input
                  title="date"
                  type="date"
                  value={values && values.paid_date}
                  onChange={(e) => setValue("paid_date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  {errors && errors.paid_date && (
                    <ErrorMessage message={errors.paid_date} />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Monto Pagado
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={values && values.paid_amount}
                  onChange={(e) => setValue("paid_amount", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="monto aboonado"
                />
                {errors && errors.paid_amount && (
                  <ErrorMessage message={errors.paid_amount} />
                )}
              </div>
            </div>
            <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Pagado Por
                </label>
                <select
                  title="interval"
                  value={values && values.processed_by}
                  onChange={(e) => setValue("processed_by", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={""}>Yo</option>
                  <option value="incomplete">empleado1</option>
                  <option value="paid">empleado2</option>
                </select>
              </div>
            </>
            
          )} */}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                closeModal(FORM_NAME);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Editar Pago
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
