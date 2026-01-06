import React from "react";
import { Link } from "react-router";
/* import {
  PaymentIcon,
  UserIcon,
  SackDollar,
  StarIcon,
} from "../../Icons"; */

import { User, CreditCard, DollarSign, Star } from "lucide-react";

const getReputationInfo = (score: number) => {
  if (score >= 90) return { color: "bg-green-600", label: "buena" };
  if (score >= 70) return { color: "bg-yellow-400", label: "aceptable" };
  if (score >= 50) return { color: "bg-orange-400", label: "regular" };
  if (score >= 30) return { color: "bg-red-500", label: "mala" };
  console.log(score);
  if (score == 0) return "sin reputacion";
  return { color: "bg-red-900", label: "Basura" };
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-ES", {}).format(value);
};
const ClientCard = ({ client }: { client: any }) => {
  return (
    <div className="flex justify-between bg-blue-500 items-strech bg-primary p-4 rounded-2xl shadow-xl relative">
      {/* Izquierda: avatar, nombre, reputación */}
      <div className="flex items-start gap-4">
        <ReputationCol client={client}></ReputationCol>

        {/* Nombre y pagos */}
        <PaymentsName client={client}></PaymentsName>
      </div>

      {/* Derecha: préstamos compactos */}
      <Loans client={client}></Loans>
    </div>
  );
};


function ReputationCol({ client }: any) {
  const reputation: any = getReputationInfo(client.reputation || 100);
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center"
        title={`Reputación del cliente: ${client.reputation || 0}`}
      >
        <User />
      </div>
      <span className=" flex items-center justify-center px-1 text-white   text-sm bg-green-600 rounded-md mt-3">
        activo
      </span>
      {/* Reputación */}
      <div
        className="mt-2 flex flex-col items-center cursor-help"
        title={`Reputación del cliente: ${client.reputation || 0}`}
      >
        <div className="flex justify-center items-center  w-full  gap-1 text-white text-sm">
          <Star
            className="text-yellow-300 "
            fill="yellow"
            width={14}
            height={14}
          />
          <span>{reputation.label}</span>
          <span className="text-white/70 text-xs font-mono "></span>
        </div>

        <div className="w-20 h-2 rounded-full bg-white/30 mt-1 overflow-hidden">
          <div
            className={`${reputation.color} h-full`}
            style={{ width: `${client.reputation || 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Loans({ client }: any) {
  return (
    <div>
      <div
        className="flex flex-col items-center bg-white text-gray-900 rounded-lg p-1 shadow-md cursor-help"
        title="Préstamos"
      >
        <DollarSign className="text-primary" width={24} height={24} />
        <div className="mt-1 text-sm font-semibold">
          {client.total_completed_loans ?? 0} / {client.total_loans}0
        </div>
        <div className="flex flex-col justify-center items-center text-xs text-gray-700">
          {client.total_active_loans ?? 0}
          <span>activos</span>
        </div>
      </div>
    </div>
  );
}

function PaymentsName({ client }: any) {
  const renderPaymentStat = (
    count: number,
    bgColor: string,
    tooltip: string
  ) => (
    <div className="flex flex-col items-center text-white" title={tooltip}>
      <CreditCard
        className={`${bgColor} rounded-full p-1 mb-1 cursor-help`} // cursor para indicar tooltip
        width={20}
        height={20}
      />
      <span className="font-semibold text-sm">{count}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full justify-between">
      <Link
        to={`/clients/${client.id}`}
        className="text-md font-bold text-white "
      >
        {client.nickname} nombre del cliente
      </Link>
      <span className="text-xs text-white">cliente desde 12/12/2024</span>
      <div className="mt-3 flex gap-3">
        {renderPaymentStat(
          client.total_expired_payments ?? 0,
          "bg-red-500",
          "Pagos vencidos"
        )}
        {renderPaymentStat(
          client.total_paid_payments ?? 0,
          "bg-green-500",
          "Pagos pagados"
        )}
        {renderPaymentStat(
          client.total_pending_payments ?? 0,
          "bg-blue-500 border border-white",
          "Pagos pendientes"
        )}
        {renderPaymentStat(
          client.total_incomplete_payments ?? 0,
          "bg-yellow-500",
          "Pagos incompletos"
        )}
      </div>
      <div className="flex gap-2 items-end  items-center ">
        <p className="text-xs text-white">
          Deuda Total{" "}
          <span className="text-lg text-red-500 ">
            ${formatCurrency(20000)}{" "}
          </span>
        </p>
      </div>
    </div>
  );
}



export default ClientCard;