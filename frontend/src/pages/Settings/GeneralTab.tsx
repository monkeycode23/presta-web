


import { Clock } from 'lucide-react'
import React from 'react'

export default function GeneralTab({activeTab}:any) {


    const formData = {}
  return (
   <>
    {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Configuración General</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Ajustes generales de tu sistema
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Horario de Inicio
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                     /*  value={formData.businessHours?.start} */
                    /*   onChange={(e) => setFormData({
                        ...formData,
                        businessHours: { ...formData.businessHours, start: e.target.value }
                      })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Horario de Cierre
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                     /*  value={formData.businessHours.end} */
                     /*  onChange={(e) => setFormData({
                        ...formData,
                        businessHours: { ...formData.businessHours, end: e.target.value }
                      })} */
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Moneda
                  </label>
                  <select
                   /*  value={formData.currency} */
                   /*  onChange={(e) => setFormData({ ...formData, currency: e.target.value })} */
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">Dólar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="VES">Bolívar (VES)</option>
                    <option value="COP">Peso Colombiano (COP)</option>
                    <option value="MXN">Peso Mexicano (MXN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Formato de Fecha
                  </label>
                  <select
                   /*  value={formData.dateFormat} */
                   /*  onChange={(e) => setFormData({ ...formData, dateFormat: e.target.value })} */
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-gray-900 mb-4">Portal de Clientes</h4>
                
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                   /*  checked={formData.allowClientSelfService} */
                   /*  onChange={(e) => setFormData({ ...formData, allowClientSelfService: e.target.checked })} */
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="text-sm text-gray-900">Permitir autoservicio de clientes</p>
                    <p className="text-xs text-gray-500">
                      Los clientes pueden acceder al portal y ver sus préstamos y pagos
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}
   </>
  )
}
