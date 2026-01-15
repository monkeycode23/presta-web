import React, { useState } from "react";
import { usePaymentStore } from "../../store/payment.store";
import { useClientStore } from "../../store/client.store";
import { useLoanStore } from "../../store/loan.store";
import {
  CheckCircle,
  ClockAlert,
  CreditCard,
  DollarSign,
  Eye,
  Pencil,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { formatCurrency } from "../../common/funcs";

import Modal from "../../components/Modal";
import { useForm } from "../../hooks/useForm";
interface PayPaymentModalProps {
  payment: any;
}

import { PayPaymentSchema } from "../../errors/schemas/payment.schema";
import ErrorMessage from "../Clients/AddClientModal";
import { useAuthStore } from "../../store/auth.store";

const PayPaymentModal: React.FC<PayPaymentModalProps> = ({ payment }) => {

    
  const today = new Date(); // fecha actual YYYY-MM-DD
  const isLate = today > new Date(payment.payment_date);

  const paymentStore = usePaymentStore()
  const loanStore = useLoanStore()
  const clientStore = useClientStore()
  const authStore = useAuthStore()

  const {user} = authStore

    const {values,handleSubmit:submit,setValue,errors} = useForm({
        name:"PAY_PAYMENT"+payment._id,
        schema:PayPaymentSchema,
        initialValues:{
        amount:payment.status == "incomplete" ? payment.left_amount : payment.amount ,
        payment_method:"cash",
        notes:"",
       
        payment_date:new Date().toISOString()
    }})


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);


  const [amount, setAmount] = useState<number>(payment.total_amount);
  const [notes, setNotes] = useState<string>("");

  const onDate =
    today.toISOString().split("T")[0] == payment.payment_date.split("T")[0];
 /*  console.log(
    onDate,
    today.toISOString().split("T")[0],
    payment.payment_date.split("T")[0]
  ); */
  // Validación del monto
  

  const handleSubmit = async () => {


    setIsAmountValid(values.amount > 0 && values.amount <= payment.total_amount)
    
    const res = await submit({
        url:"/payments/pay/"+payment._id,
        method:"POST"
    },(data:any)=>{
        
     //   console.log(data)
        const {payment:_payment,client,loan} = data.data

        paymentStore.updatePayment(_payment._id,{
            ..._payment,
            loan:{
                ...payment.loan
            },
            processed_by:{
                _id:user?._id,
                avatar:user?.avatar,
                username:user?.username

            }
        })
        loanStore.updateLoan(loan._id,loan)

         clientStore.updateClient(client._id,client)

       
        /////////////////////actualizar datos 
    })
    setAmount(0);
    setNotes("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex gap-1 text-sm hover:text-green-600 cursor-pointer"
      >
        pagar <CheckCircle width={15}></CheckCircle>
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 bg-white rounded-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Registrar Pago</h2>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Monto abonado
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={(values && values.amount) ?? 0}
                onChange={(e) => setValue("amount",Number(e.target.value))}
                min={0}
                step={1000}
                max={payment.total_amount}
                placeholder={`Máximo ${payment.total_amount}`}
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setValue("amount",payment.total_amount-payment.paid_amount)}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                $
              </button>
            </div>
            {(errors&& errors.amount) && (
              <ErrorMessage message={errors.amount} />
            )}

            {
                !isAmountValid && (
                     <ErrorMessage message={"El monto no debe superar al monto del pago"} />
                )
            }
           
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Método de pago
            </label>
            <select
            title="method"
              value={values && values.payment_method}
              onChange={(e) => setValue("payment_method",e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona un método</option>
              <option value="cash">Efectivo</option>
              <option value="credit_card">Tarjeta de crédito</option>
              <option value="transfer">Transferencia</option>
            </select>
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Notas
          </label>
          <textarea
            value={values &&  values.notes}
            onChange={(e) => setValue("notes",e.target.value)}
            placeholder="Escribe alguna nota opcional..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
            {errors && errors.notes && (
              <ErrorMessage message={errors.notes} />
            )}
          {isLate && !onDate && (
            <p className="text-yellow-600 text-sm mb-2">
              ⚠ Este pago se está realizando fuera de la fecha de vencimiento.
            </p>
          )}

          {!isLate &&
          today.toISOString().split("T")[0] !=
            payment.payment_date.split("T")[0] ? (
            <p className="text-green-600 text-sm mb-2">
              Este pago se está realizando por adelantado.
            </p>
          ) : (
            <p className="text-green-600 text-sm mb-2">
              Este pago se está realizando en Fecha de vencimiento.
            </p>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isAmountValid}
              className={`flex items-center gap-1 px-4 py-2 text-white rounded-md ${
                isAmountValid
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-300 cursor-not-allowed"
              }`}
            >
              Pagar <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PayPaymentModal;
