

import React, { useEffect } from 'react'
import { formatCurrency } from '../../common/funcs'
import { Award, CheckCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { useClientStore } from '../../store/client.store';

export default function ClientStatics() {


    const {selectedClient,clients} = useClientStore()

    const statics = selectedClient?.statics

   useEffect(() => {
     
   
     return () => {
       
     }
   }, [clients,selectedClient])
   


    const clientPayments :any = []
    const loans:any = []
  
   
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Total Solicitado</p>
              <p className="text-2xl mt-1">${formatCurrency(statics?.amounts ? statics.amounts.total_lent : 0)}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-white/20">
            <p className="text-sm text-blue-100">En {statics?.loans.total} préstamo{statics?.loans!.total!>1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">Total Devuelto</p>
              <p className="text-2xl mt-1">{formatCurrency(statics?.amounts ? statics?.amounts.total_paid : 0)}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-white/20">
            <p className="text-sm text-green-100">{clientPayments.filter(p => p.status === 'pagada').length} pagos realizados</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-sm">Deuda Pendiente</p>
              <p className="text-2xl mt-1">{formatCurrency(statics?.amounts ? statics?.amounts.client_debt  : 0)}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-white/20">
            <p className="text-sm text-orange-100">{statics?.loans.active} préstamo{statics?.loans.active !== 1 ? 's' : ''} activo{statics?.loans.active !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">Tasa de Pago</p>
              <p className="text-2xl mt-1">{/* paymentRate.toFixed(1) */}{
              statics?.payments && statics?.payments.paid! /(statics?.payments.paid!+statics?.payments.expired!)*100
            }%</p>
            </div>
          </div>
          <div className="pt-3 border-t border-white/20">
            <p className="text-sm text-purple-100">
                pagos vencidos {statics?.payments && statics?.payments.expired}
                
                </p>
          </div>
        </div>
      </div>

  )
}
