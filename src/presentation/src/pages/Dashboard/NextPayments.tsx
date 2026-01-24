
import React from 'react'

import { formatCurrency2 as formatCurrency } from '../../common/funcs';
import { usePaymentStore } from '../../store/payment.store';


export default function NextPayments() {
  const {payments:weeklyPayments} = usePaymentStore()

  

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Próximos Pagos (Esta Semana)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Cliente</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Monto</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Estado</th>
              </tr>
            </thead>
            <tbody>
              {weeklyPayments.slice(0, 10).map(payment => {
                const loan = payment.loan
                const client = payment.client
                return (
                  <tr key={payment._id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {new Date(payment.payment_date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{client?.nickname}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                        payment.status === 'pagada'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'vencida'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status === 'pagada' ? 'Pagada' : payment.status === 'vencida' ? 'Vencida' : 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

  )
}
