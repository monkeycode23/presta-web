


import { AlertCircle, Calendar, CheckCircle, DollarSign, TrendingUp, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { formatCurrency2 as formatCurrency } from '../../common/funcs'

export default function StaticsCards() {

    const [cardStatics,setCardStatcis ] = useState({
        totalClients:0,
        activeLoans:0,
        overduePayments:0,
        totalCollected:0,
        totalPending:0,
        weeklyCollected:0
    })

    const {totalClients,
        activeLoans,
        overduePayments,
        totalCollected,
        totalPending,
        weeklyCollected} = cardStatics;


    useEffect(() => {
      
        
    
      return () => {
        
      }
    }, [])
    

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Clientes</p>
              <p className="text-gray-900 mt-1">{totalClients}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Préstamos Activos</p>
              <p className="text-gray-900 mt-1">{activeLoans}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Cuotas Vencidas</p>
              <p className="text-gray-900 mt-1">{overduePayments}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Recaudado</p>
              <p className="text-gray-900 mt-1">{formatCurrency(totalCollected)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Por Recaudar</p>
              <p className="text-gray-900 mt-1">{formatCurrency(totalPending)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Recaudado esta Semana</p>
              <p className="text-gray-900 mt-1">{formatCurrency(weeklyCollected)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
  )
}
