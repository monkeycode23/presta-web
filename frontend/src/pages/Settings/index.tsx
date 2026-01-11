import React, { useState } from 'react';
import { Settings as SettingsIcon, DollarSign, Calendar, Bell, Shield, Percent, Clock, Save, AlertTriangle } from 'lucide-react';
import { useAppSettingsStore } from '../../store/app.settings.store';
import LoanTab from './LoanTab';
import PaymentsTab from './PaymentsTab';
import NotificationTab from './NotificationTab';
import GeneralTab from './GeneralTab';

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

export function Settings() {


    const { settings } = useAppSettingsStore()


  const [formData, setFormData] = useState<AppSettings>(settings);
  const [activeTab, setActiveTab] = useState<'loans' | 'payments' | 'notifications' | 'general'>('loans');


  
    const  onUpdateSettings = (e: React.FormEvent) => {
    
  };

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
          <LoanTab activeTab={activeTab}></LoanTab>

          {/* Tab: Pagos */}
             <PaymentsTab activeTab={activeTab}></PaymentsTab>

          {/* Tab: Notificaciones */}
         <NotificationTab activeTab={activeTab}></NotificationTab>

          {/* Tab: General */}
              
              <GeneralTab  activeTab={activeTab}></GeneralTab>

          {/* Botones de acción */}
          <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Restablecer
            </button>
            <button
              type="submit"
              className=" flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
