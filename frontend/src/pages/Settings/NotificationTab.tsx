


import { AlertTriangle, DollarSign, Shield,Calendar } from 'lucide-react'
import React from 'react'

export default function NotificationTab({activeTab}) {

    const formData = {}
  return (
   <>
    {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Configuración de Notificaciones</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Elige qué notificaciones deseas recibir
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={formData.notifyOnNewLoan}
                    /* onChange={(e) => setFormData({ ...formData, notifyOnNewLoan: e.target.checked })} */
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Notificar cuando se otorga un préstamo</p>
                      <p className="text-xs text-gray-500">
                        Recibirás una notificación cada vez que se cree un nuevo préstamo
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={formData.notifyOnPaymentReceived}
                    /* onChange={(e) => setFormData({ ...formData, notifyOnPaymentReceived: e.target.checked })} */
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Notificar cuando se recibe un pago</p>
                      <p className="text-xs text-gray-500">
                        Te avisaremos cuando los clientes realicen sus pagos
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={formData.notifyOnPaymentOverdue}
                    /* onChange={(e) => setFormData({ ...formData, notifyOnPaymentOverdue: e.target.checked })} */
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Notificar pagos vencidos</p>
                      <p className="text-xs text-gray-500">
                        Alerta cuando un pago esté vencido o próximo a vencer
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={formData.notifyOnEmployeeAction}
                    /* onChange={(e) => setFormData({ ...formData, notifyOnEmployeeAction: e.target.checked })} */
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Notificar acciones de empleados</p>
                      <p className="text-xs text-gray-500">
                        Recibe alertas cuando tus empleados realicen operaciones importantes
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}
   </>
  )
}
