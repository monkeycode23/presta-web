import React from "react";
import { Link, useNavigate } from "react-router";
/* import {
  PaymentIcon,
  UserIcon,
  SackDollar,
  StarIcon,
} from "../../Icons"; */

import { User, CreditCard, DollarSign, Star } from "lucide-react";
import { useClientStore } from "../../store/client.store";

const getReputationInfo = (score: number) => {
  if (score >= 90) return { color: "bg-green-300", label: "buena" };
  if (score >= 70) return { color: "bg-yellow-300", label: "aceptable" };
  if (score >= 50) return { color: "bg-orange-300", label: "regular" };
  if (score >= 30) return { color: "bg-red-300", label: "mala" };
  console.log(score);
  if (score == 0) return "sin reputacion";
  return { color: "bg-red-900", label: "Basura" };
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-ES", {}).format(value);
};
const ClientCard = ({ client }: { client: any }) => {
  const clientsStre = useClientStore();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        clientsStre.selectClient(client);

        navigate("/clients/" + client._id);
      }}
      className="flex justify-between    text-gray-800 items-strech  p-7 rounded-2xl shadow-xl relative border cursor-pointer border-gray-200 hover:bg-gray-50 hover:shadow-lg transition-shadow"
    >
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
    <div className="flex flex-col items-center ">
      <div
        className="w-16 h-16 bg-gray-100 text-gray-500 border border-gray-200 rounded-xl flex items-center justify-center"
        title={`Reputación del cliente: ${client.reputation || 0}`}
      >
        <User />
      </div>

      {/* Reputación */}
      <div
        className=" flex flex-col items-center cursor-help mt-2"
        title={`Reputación del cliente: ${client.reputation || 0}`}
      >
        <div className="flex justify-center items-center  w-full  gap-1  text-sm">
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
        className="flex flex-col items-center bg-gray-100 border border-gray-200 text-gray-500 rounded-lg p-1 shadow-md cursor-help"
        title="Préstamos"
      >
        <DollarSign className="text-primary" width={24} height={24} />
        <div className="mt-1 text-sm font-semibold">
          {(client.statics.loans && client.statics.loans.completed) ?? 0} / {(client.statics.loans && client.statics.loans.total) ?? 0}
        </div>
        <div className="flex flex-col justify-center items-center text-xs text-gray-500">
          {(client.statics.loans && client.statics.loans.active)?? 0}
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
    <div className="flex flex-col items-center " title={tooltip}>
      <CreditCard
        className={`${bgColor}  rounded-full p-1 mb-1 cursor-help`} // cursor para indicar tooltip
        width={23}
        height={23}
      />
      <span className=" text-sm">{count}</span>
    </div>
  );

  console.log(client)

  return (
    <div className="flex flex-col h-full justify-between text-gray-800">
      <span onClick={() => {}} className="text-md   ">
        {client.nickname}
      </span>

      <span className="text-sm text-gray-600">
        cliente desde 
        <span className="text-xs font-bold text-gray-500"> {client.client_since.split("T")[0]} </span>
      </span>

      <div className="mt-3 flex gap-3">
        {renderPaymentStat(
         (client.statics.payments && client.statics.payments.expired) ?? 0,
          "bg-red-200 text-red-500",
          "Pagos vencidos"
        )}
        {renderPaymentStat(
          (client.statics.payments && client.statics.payments.paid) ?? 0,
          "bg-green-200 text-green-500",
          "Pagos pagados"
        )}
        {renderPaymentStat(
          (client.statics.payments && client.statics.payments.pending) ?? 0,
          "bg-blue-200 border text-blue-500",
          "Pagos pendientes"
        )}
        {renderPaymentStat(
          (client.statics.payments && client.statics.payments.incomplete) ?? 0,
          "bg-yellow-200 text-yellow-500",
          "Pagos incompletos"
        )}
      </div>
      <div className="flex gap-2 items-end  items-center ">
        {/* <p className="text-xs ">
          Deuda Total{" "}
          <span className="text-lg text-red-500 ">
            ${formatCurrency(0)}{" "}
          </span>
        </p> */}
      </div>
    </div>
  );
}

export default ClientCard;
