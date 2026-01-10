
import React from 'react'
import { formatCurrency } from '../../common/funcs';
import { Calendar, DollarSign, Percent } from 'lucide-react';
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
            <div className="bg-indigo-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total a Pagar</p>
              <p className="text-gray-900">{formatCurrency(totalToPay)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Capital + Intereses</p>
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
