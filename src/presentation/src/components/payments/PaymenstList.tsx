import React,{useState} from "react";
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

import Dropdown from "../Dropdowns/Dropdown";
import PayPaymentModal from "../../pages/ClientDetail/PayPaymentModal";


export default function PaymentsList() {
  const { payments, updatePayment } = usePaymentStore();
  const { selectClient: client } = useClientStore();
  const { currentLoan: loan } = useLoanStore();

  return (
    <div>
      {payments.map((payment, index) => {
        return (
            <PaymentListItem key={index} payment={payment}></PaymentListItem>         
        );
      })}
    </div>
  );
}







function PaymentListItem({ payment }: any) {
  return (
    <div>
      <div
        className="sm:hidden flex items-center justify-between p-3 mb-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Icono de estado */}
          <div
            className={`p-2 rounded-lg ${
              payment.status === "paid"
                ? "bg-green-100"
                : payment.status === "expired"
                ? "bg-red-100"
                : payment.status === "pending"
                ? "bg-blue-100"
                : "bg-yellow-100"
            }`}
          >
            {payment.status === "paid" && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {payment.status === "expired" && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            {payment.status === "pending" && (
              <ClockAlert className="w-5 h-5 text-blue-600" />
            )}
            {payment.status === "incomplete" && (
              <ClockAlert className="w-5 h-5 text-yellow-600" />
            )}
          </div>

          {/* Información del pago */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{payment.label}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Préstamo: ${formatCurrency(payment.loan?.amount || 0)}
              </span>
              <span>•</span>
              <span className="capitalize">{payment.loan?.payment_interval}</span>
              <span>•</span>
              <span>F. venc: {payment.payment_date.split("T")[0]}</span>
            </div>
          </div>

          {/* Monto y estado */}
          <div className="text-right flex flex-col items-end gap-1">
            {payment.status === "incomplete" ? (
              <>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 font-semibold">
                    {formatCurrency(payment.paid_amount || 0)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-red-600" />
                  <span className="text-red-800 font-semibold">
                    {formatCurrency(
                      (payment.total_amount || 0) - (payment.paid_amount || 0)
                    )}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">
                  {formatCurrency(payment.total_amount)}
                </span>
              </div>
            )}

           <div className="flex gap-2">

             {/* Avatar y fecha solo si paid o incomplete */}
            {(payment.status === "paid" || payment.status === "incomplete") && (
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">

                 {/* Fecha de pago */}
                <span> el   
                   <b> {payment.paid_date
                    ? new Date(payment.paid_date).toLocaleDateString()
                    : ""}</b>
                </span> 
                por 
                {/* Avatar */}
                <b>
                    {payment.processed_by?.username}
                    
                    </b>
                <img
                  src={payment.processed_by?.avatar}
                  alt={payment.processed_by?.username}
                  className="w-5 h-5 rounded-full object-cover"
                />
               
              </div>
            )}

             <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                payment.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : payment.status === "expired"
                  ? "bg-red-100 text-red-800"
                  : payment.status === "pending"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {payment.status === "paid"
                ? "Pagada"
                : payment.status === "expired"
                ? "Vencida"
                : payment.status === "pending"
                ? "Pendiente"
                : "Incompleta"}
            </span>
           </div>

            {/* Badge de estado */}
           
          </div>
        </div>

        {/* Opciones */}
        <Dropdown right={true} top={40} className="ml-3">
          <div className="flex gap-3 p-3 shadow-2xl">
            {payment.status !== "paid" && <PayPaymentModal payment={payment} />}
            <button className="flex gap-1 text-sm hover:text-yellow-600 cursor-pointer">
              editar <Pencil width={15} />
            </button>
            <button className="flex gap-1 text-sm hover:text-red-600 cursor-pointer">
              eliminar <Trash2 width={15} />
            </button>
            <button className="flex gap-1 text-sm hover:text-gray-600 cursor-pointer">
              ver <Eye width={15} />
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}



function PaymentListItem2({ payment }: any) {
  return (
    <div className=" mb-3">
      <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Icono estado */}
            <div
              className={`p-2 rounded-lg shrink-0 ${
                payment.status === "paid"
                  ? "bg-green-100"
                  : payment.status === "expired"
                  ? "bg-red-100"
                  : payment.status === "pending"
                  ? "bg-blue-100"
                  : "bg-yellow-100"
              }`}
            >
              {payment.status === "paid" && <CheckCircle className="w-5 h-5 text-green-600" />}
              {payment.status === "expired" && <XCircle className="w-5 h-5 text-red-600" />}
              {payment.status === "pending" && <ClockAlert className="w-5 h-5 text-blue-600" />}
              {payment.status === "incomplete" && <ClockAlert className="w-5 h-5 text-yellow-600" />}
            </div>

            {/* Label + info */}
            <div>
              <p className="font-semibold text-gray-900">{payment.label}</p>
              <p className="text-xs text-gray-500">
                Préstamo: ${formatCurrency(payment.loan?.amount || 0)} ·{" "}
                {payment.loan?.payment_interval}
              </p>
              <p className="text-xs text-gray-400">
                Vence: {payment.payment_date.split("T")[0]}
              </p>
            </div>
          </div>

          {/* Dropdown */}
          <Dropdown right top={30}>
            <div className="flex flex-col gap-2 p-2">
              {payment.status !== "paid" && <PayPaymentModal payment={payment} />}
              <button className="text-sm hover:text-yellow-600 flex gap-1">
                editar <Pencil width={14} />
              </button>
              <button className="text-sm hover:text-red-600 flex gap-1">
                eliminar <Trash2 width={14} />
              </button>
              <button className="text-sm hover:text-gray-600 flex gap-1">
                ver <Eye width={14} />
              </button>
            </div>
          </Dropdown>
        </div>

        {/* MONTO */}
        <div className="mt-3">
          {payment.status === "incomplete" ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-green-700 font-semibold">
                <DollarSign className="w-4 h-4" />
                {formatCurrency(payment.paid_amount || 0)}
                <span className="text-xs text-gray-500 ml-1">pagado</span>
              </div>
              <div className="flex items-center gap-1 text-red-700 font-semibold">
                <DollarSign className="w-4 h-4" />
                {formatCurrency(
                  (payment.total_amount || 0) - (payment.paid_amount || 0)
                )}
                <span className="text-xs text-gray-500 ml-1">pendiente</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
              <DollarSign className="w-5 h-5 text-gray-400" />
              {formatCurrency(payment.total_amount)}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-3 flex items-center justify-between">
          {/* Usuario */}
          {(payment.status === "paid" || payment.status === "incomplete") && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <img
                src={payment.processed_by?.avatar}
                alt={payment.processed_by?.username}
                className="w-6 h-6 rounded-full"
              />
              <span>
                {payment.processed_by?.username} ·{" "}
                {payment.paid_date
                  ? new Date(payment.paid_date).toLocaleDateString()
                  : ""}
              </span>
            </div>
          )}

          {/* Badge */}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              payment.status === "paid"
                ? "bg-green-100 text-green-800"
                : payment.status === "expired"
                ? "bg-red-100 text-red-800"
                : payment.status === "pending"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {payment.status === "paid"
              ? "Pagada"
              : payment.status === "expired"
              ? "Vencida"
              : payment.status === "pending"
              ? "Pendiente"
              : "Incompleta"}
          </span>
        </div>
      </div>
    </div>
  );
}



 function PaymentCard({payment}:any) {
  return (
   <div  className="md:hidden lg:hidden xl:hidden block  mb-4">
  <div
    className={`relative w-full p-4 rounded-xl shadow-md transition-all ${
      payment.status === "paid"
        ? "bg-green-100"
        : payment.status === "expired"
        ? "bg-red-100"
        : "bg-blue-100"
    }`}
  >
    {/* More button */}
    <div className="absolute top-2 right-2">
      <Dropdown>
        <div className="flex flex-col p-2 gap-2 bg-white shadow rounded-md">
          {payment.status !== "paid" && (
            <PayPaymentModal payment={payment} />
          )}
          <button className="flex items-center gap-1 text-sm hover:text-yellow-600">
            <Pencil width={15} /> Editar
          </button>
          <button className="flex items-center gap-1 text-sm hover:text-red-600">
            <Trash2 width={15} /> Eliminar
          </button>
          <button className="flex items-center gap-1 text-sm hover:text-gray-600">
            <Eye width={15} /> Ver
          </button>
        </div>
      </Dropdown>
    </div>

    {/* Icono y estado */}
    <div className="flex items-center gap-4 mb-2">
      <div
        className={`p-2 rounded-lg ${
          payment.status === "paid"
            ? "bg-green-200"
            : payment.status === "expired"
            ? "bg-red-200"
            : "bg-blue-200"
        }`}
      >
        {payment.status === "paid" && (
          <CheckCircle className="w-5 h-5 text-green-600" />
        )}
        {payment.status === "expired" && (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        {payment.status === "pending" && (
          <ClockAlert className="w-5 h-5 text-blue-600" />
        )}
      </div>

      {/* Label */}
      <p className="font-bold text-gray-900">{payment.label}</p>
    </div>

    {/* Monto y detalles */}
    <div className="flex justify-between items-center mb-2">
      <div>
        <h1 className="text-2xl font-bold">
          ${formatCurrency(payment.total_amount)}
        </h1>
        <p className="text-sm text-gray-700">
          F. venc: {payment.payment_date.split("T")[0]}
        </p>
        {payment.loan?.interest && (
          <p className="text-sm text-green-600 font-semibold">
            Interés: ${formatCurrency(
              Math.round(
                (payment.loan.amount * payment.loan.interest) / 100
              )
            )}
          </p>
        )}
        {payment.loan?.payment_interval && (
          <p className="text-sm text-gray-600 capitalize">
            Período: {payment.loan.payment_interval}
          </p>
        )}
      </div>

      {/* Estado debajo del símbolo */}
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold p-2 rounded-md bg-white/50 text-gray-800 mb-1">
          $
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            payment.status === "paid"
              ? "bg-green-200 text-green-800"
              : payment.status === "expired"
              ? "bg-red-200 text-red-800"
              : "bg-blue-200 text-blue-800"
          }`}
        >
          {payment.status === "paid"
            ? "Pagada"
            : payment.status === "expired"
            ? "Vencida"
            : "Pendiente"}
        </span>
      </div>
    </div>
  </div>
</div>

  )
}
