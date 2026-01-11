

import React from 'react'

import { Bell, Percent,Calendar } from 'lucide-react'

export default function PaymentsTab({activeTab}:any) {

    const formData ={}
  return (
   <>
    {activeTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Configuración de Pagos</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Define cómo se manejan los pagos y los retrasos en tu sistema
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Días de Gracia para Pagos Atrasados
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      min="0"
                      max="30"
                     /*  value={formData.latePaymentGraceDays}
                      onChange={(e) => setFormData({ ...formData, latePaymentGraceDays: parseInt(e.target.value) })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Días permitidos después del vencimiento sin penalización
                  </p>
                </div> *

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Recordatorios Antes del Vencimiento (días)
                  </label>
                  <div className="relative">
                    <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      min="1"
                      max="15"
                      /* value={formData.reminderDaysBefore}
                      onChange={(e) => setFormData({ ...formData, reminderDaysBefore: parseInt(e.target.value) })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Con cuántos días de anticipación notificar a los clientes
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-gray-900 mb-4">Multas por Atraso</h4>
                
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 mb-4">
                  <input
                    type="checkbox"
                   /*  checked={formData.enableLatePaymentFee}
                    onChange={(e) => setFormData({ ...formData, enableLatePaymentFee: e.target.checked })} */
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="text-sm text-gray-900">Habilitar multas por pagos atrasados</p>
                    <p className="text-xs text-gray-500">
                      Cobra una penalización adicional a los pagos vencidos
                    </p>
                  </div>
                </label>

                {formData?.enableLatePaymentFee && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Porcentaje de Multa (%)
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.5"
                        /* value={formData.latePaymentFeePercent}
                        onChange={(e) => setFormData({ ...formData, latePaymentFeePercent: parseFloat(e.target.value) })} */
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Porcentaje que se agregará al monto del pago vencido
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-gray-900 mb-4">Recordatorios de Pago</h4>
                
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    /* checked={formData.enablePaymentReminders}
                    onChange={(e) => setFormData({ ...formData, enablePaymentReminders: e.target.checked })} */
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="text-sm text-gray-900">Habilitar recordatorios automáticos</p>
                    <p className="text-xs text-gray-500">
                      Envía recordatorios a clientes antes de la fecha de vencimiento
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}
   </>
  )
}
