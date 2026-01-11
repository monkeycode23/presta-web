

import { Clock, DollarSign, Percent } from 'lucide-react'
import React from 'react'

export default function LoanTab({activeTab}:any) {

    
  return (
    <>
    {activeTab === 'loans' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Configuración de Préstamos</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Establece los parámetros predeterminados para los préstamos en tu sistema
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Tasa de Interés Predeterminada (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                    title='a'
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      /* value={formData.defaultInterestRate}
                      onChange={(e) => setFormData({ ...formData, defaultInterestRate: parseFloat(e.target.value) })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Tasa que se aplicará por defecto a nuevos préstamos
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Plazo Predeterminado (cuotas)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      min="1"
                      /* value={formData.defaultLoanTerm}
                      onChange={(e) => setFormData({ ...formData, defaultLoanTerm: parseInt(e.target.value) })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Número de cuotas sugerido al crear un préstamo
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Monto Mínimo de Préstamo ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      min="0"
                      step="100"
                     /*  value={formData.minLoanAmount}
                      onChange={(e) => setFormData({ ...formData, minLoanAmount: parseFloat(e.target.value) })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Cantidad mínima permitida para otorgar préstamos
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Monto Máximo de Préstamo ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      /* value={formData.maxLoanAmount}
                      onChange={(e) => setFormData({ ...formData, maxLoanAmount: parseFloat(e.target.value) })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Cantidad máxima permitida para otorgar préstamos
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-gray-900 mb-4">Políticas de Préstamos</h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                     /*  checked={formData.requireClientApproval}
                      onChange={(e) => setFormData({ ...formData, requireClientApproval: e.target.checked })} */
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="text-sm text-gray-900">Requerir aprobación del cliente</p>
                      <p className="text-xs text-gray-500">
                        Los clientes deben aceptar los términos antes de otorgar el préstamo
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      /* checked={formData.allowNegativeBalance}
                      onChange={(e) => setFormData({ ...formData, allowNegativeBalance: e.target.checked })} */
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="text-sm text-gray-900">Permitir saldo negativo</p>
                      <p className="text-xs text-gray-500">
                        Permite que los clientes tengan deuda acumulada sin restricciones
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
    </>
  )
}
