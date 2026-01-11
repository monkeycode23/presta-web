import React, { useState } from 'react';
import { Settings as SettingsIcon, DollarSign, Calendar, Bell, Shield, Percent, Clock, Save, AlertTriangle } from 'lucide-react';

export interface AppSettings {
  // Configuraciones de préstamos
  defaultInterestRate: number;
  minLoanAmount: number;
  maxLoanAmount: number;
  defaultLoanTerm: number;
  allowNegativeBalance: boolean;
  requireClientApproval: boolean;
  
  // Configuraciones de pagos
  latePaymentGraceDays: number;
  enableLatePaymentFee: boolean;
  latePaymentFeePercent: number;
  enablePaymentReminders: boolean;
  reminderDaysBefore: number;
  
  // Configuraciones de notificaciones
  notifyOnNewLoan: boolean;
  notifyOnPaymentReceived: boolean;
  notifyOnPaymentOverdue: boolean;
  notifyOnEmployeeAction: boolean;
  
  // Configuraciones generales
  businessHours: {
    start: string;
    end: string;
  };
  currency: string;
  dateFormat: string;
  allowClientSelfService: boolean;
}

interface SettingsProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export function Settings({ settings, onUpdateSettings }: SettingsProps) {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [activeTab, setActiveTab] = useState<'loans' | 'payments' | 'notifications' | 'general'>('loans');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    alert('Configuración guardada exitosamente');
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres restablecer todas las configuraciones a los valores predeterminados?')) {
      setFormData(settings);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Configuraciones</h2>
        <p className="text-gray-600">Personaliza el comportamiento de tu sistema de préstamos</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('loans')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'loans'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              Préstamos
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'payments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Pagos
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'notifications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bell className="w-5 h-5" />
              Notificaciones
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'general'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              General
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Tab: Préstamos */}
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
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.defaultInterestRate}
                      onChange={(e) => setFormData({ ...formData, defaultInterestRate: parseFloat(e.target.value) })}
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
                      value={formData.defaultLoanTerm}
                      onChange={(e) => setFormData({ ...formData, defaultLoanTerm: parseInt(e.target.value) })}
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
                      value={formData.minLoanAmount}
                      onChange={(e) => setFormData({ ...formData, minLoanAmount: parseFloat(e.target.value) })}
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
                      value={formData.maxLoanAmount}
                      onChange={(e) => setFormData({ ...formData, maxLoanAmount: parseFloat(e.target.value) })}
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
                      checked={formData.requireClientApproval}
                      onChange={(e) => setFormData({ ...formData, requireClientApproval: e.target.checked })}
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
                      checked={formData.allowNegativeBalance}
                      onChange={(e) => setFormData({ ...formData, allowNegativeBalance: e.target.checked })}
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

          {/* Tab: Pagos */}
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
                      value={formData.latePaymentGraceDays}
                      onChange={(e) => setFormData({ ...formData, latePaymentGraceDays: parseInt(e.target.value) })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Días permitidos después del vencimiento sin penalización
                  </p>
                </div>

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
                      value={formData.reminderDaysBefore}
                      onChange={(e) => setFormData({ ...formData, reminderDaysBefore: parseInt(e.target.value) })}
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
                    checked={formData.enableLatePaymentFee}
                    onChange={(e) => setFormData({ ...formData, enableLatePaymentFee: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="text-sm text-gray-900">Habilitar multas por pagos atrasados</p>
                    <p className="text-xs text-gray-500">
                      Cobra una penalización adicional a los pagos vencidos
                    </p>
                  </div>
                </label>

                {formData.enableLatePaymentFee && (
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
                        value={formData.latePaymentFeePercent}
                        onChange={(e) => setFormData({ ...formData, latePaymentFeePercent: parseFloat(e.target.value) })}
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
                    checked={formData.enablePaymentReminders}
                    onChange={(e) => setFormData({ ...formData, enablePaymentReminders: e.target.checked })}
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

          {/* Tab: Notificaciones */}
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
                    onChange={(e) => setFormData({ ...formData, notifyOnNewLoan: e.target.checked })}
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
                    onChange={(e) => setFormData({ ...formData, notifyOnPaymentReceived: e.target.checked })}
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
                    onChange={(e) => setFormData({ ...formData, notifyOnPaymentOverdue: e.target.checked })}
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
                    onChange={(e) => setFormData({ ...formData, notifyOnEmployeeAction: e.target.checked })}
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

          {/* Tab: General */}
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
                      value={formData.businessHours.start}
                      onChange={(e) => setFormData({
                        ...formData,
                        businessHours: { ...formData.businessHours, start: e.target.value }
                      })}
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
                      value={formData.businessHours.end}
                      onChange={(e) => setFormData({
                        ...formData,
                        businessHours: { ...formData.businessHours, end: e.target.value }
                      })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Moneda
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
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
                    value={formData.dateFormat}
                    onChange={(e) => setFormData({ ...formData, dateFormat: e.target.value })}
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
                    checked={formData.allowClientSelfService}
                    onChange={(e) => setFormData({ ...formData, allowClientSelfService: e.target.checked })}
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

          {/* Botones de acción */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Restablecer
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
