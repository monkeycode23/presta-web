
import React from 'react'
import { formatCurrency } from '../../common/funcs';
import { Calendar, DollarSign, Percent, Star } from 'lucide-react';
import { useClientStore } from '../../store/client.store';



export default function ClientFinacialStatus() {

    const { selectedClient: client } = useClientStore();

    const totalToPay =0;
    const totalInterest=0;
    const totalBorrowed=0;
 
    const clientPayments:any = []
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reputacion</p>
              <p className="text-gray-900">{100}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Buena reputacion </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Percent className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Intereses Totales</p>
              <p className="text-gray-900">{formatCurrency(totalInterest)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">{((totalInterest / totalBorrowed) * 100).toFixed(1)}% del capital</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Próximo Pago</p>
              <p className="text-gray-900">
                {(() => {
                  const nextPayment = clientPayments
                    .filter((p:any) => p.status === 'pendiente')
                    .sort((a:any, b:any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
                  return nextPayment ? new Date(nextPayment.dueDate).toLocaleDateString('es-ES') : 'N/A';
                })()}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {(() => {
              const nextPayment = clientPayments
                .filter((p:any) => p.status === 'pendiente')
                .sort((a:any, b:any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
              return nextPayment ? formatCurrency(nextPayment.amount) : 'Sin pagos pendientes';
            })()}
          </p>
        </div>
      </div>

  )
}



/* 

export default function ClientFinancialStatus({ clientPayments }: any) {
  // ⬅️ cálculos aquí (los de arriba)
const payments = clientPayments || [];

const totalBorrowed = payments.reduce(
  (acc: number, p: any) => acc + (p.loan?.amount || 0),
  0
);

const totalToPay = payments.reduce(
  (acc: number, p: any) => acc + (p.total_amount || 0),
  0
);

const totalPaid = payments.reduce(
  (acc: number, p: any) => acc + (p.paid_amount || 0),
  0
);

const totalInterest = totalToPay - totalBorrowed;



const paidCount = payments.filter((p:any) => p.status === "paid").length;
const pendingCount = payments.filter((p:any) => p.status === "pending").length;
const expiredCount = payments.filter((p:any) => p.status === "expired").length;
const incompleteCount = payments.filter((p:any) => p.status === "incomplete").length;


const chartData = [
  { name: "Pagadas", value: paidCount, color: "#22c55e" },
  { name: "Pendientes", value: pendingCount, color: "#3b82f6" },
  { name: "Vencidas", value: expiredCount, color: "#ef4444" },
  { name: "Incompletas", value: incompleteCount, color: "#eab308" },
]; 

const reputationScore = Math.max(
  0,
  Math.min(
    100,
    80 + paidCount * 2 - expiredCount * 15 - incompleteCount * 8
  )
);



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* KPIs 
      <Kpi title="Total Prestado" value={formatCurrency(totalBorrowed)} icon={<DollarSign />} />
      <Kpi title="Total a Cobrar" value={formatCurrency(totalToPay)} icon={<DollarSign />} />
      <Kpi title="Ganancia" value={formatCurrency(totalInterest)} icon={<Percent />} />

      {/* GRÁFICO 
      <div className="bg-white border rounded-xl p-6 lg:col-span-2">
        <h3 className="font-semibold text-gray-700 mb-4">
          Estado de las Cuotas
        </h3>

        <div className="h-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          {chartData.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
              {d.name}: <b>{d.value}</b>
            </div>
          ))}
        </div>
      </div>

      {/* REPUTACIÓN *
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-700 mb-3">
          Reputación del Cliente
        </h3>

        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl font-bold text-indigo-600">
            {reputationScore}
          </div>
          <div className="text-sm text-gray-500">
            {reputationScore > 80
              ? "Excelente pagador"
              : reputationScore > 60
              ? "Buen pagador"
              : reputationScore > 40
              ? "Riesgo medio"
              : "Alto riesgo"}
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-indigo-500 rounded-full"
            style={{ width: `${reputationScore}%` }}
          />
        </div>

        {expiredCount > 0 && (
          <div className="flex items-center gap-2 text-xs text-red-600 mt-3">
            <AlertTriangle className="w-4 h-4" />
            {expiredCount} cuotas vencidas
          </div>
        )}
      </div>
    </div>
  );
}


function Kpi({ title, value, icon }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 flex items-center gap-3">
      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}


*/