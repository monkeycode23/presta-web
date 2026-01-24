import { create } from 'zustand';

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

interface AppSettingsStore {
  settings: AppSettings;

  // Acciones
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  updateBusinessHours: (hours: AppSettings['businessHours']) => void;
}


const defaultSettings: AppSettings = {
  // Préstamos
  defaultInterestRate: 5,
  minLoanAmount: 100,
  maxLoanAmount: 10000,
  defaultLoanTerm: 12,
  allowNegativeBalance: false,
  requireClientApproval: true,

  // Pagos
  latePaymentGraceDays: 5,
  enableLatePaymentFee: true,
  latePaymentFeePercent: 2,
  enablePaymentReminders: true,
  reminderDaysBefore: 3,

  // Notificaciones
  notifyOnNewLoan: true,
  notifyOnPaymentReceived: true,
  notifyOnPaymentOverdue: true,
  notifyOnEmployeeAction: false,

  // Generales
  businessHours: {
    start: '09:00',
    end: '18:00',
  },
  currency: 'USD',
  dateFormat: 'YYYY-MM-DD',
  allowClientSelfService: true,
};



export const useAppSettingsStore = create<AppSettingsStore>((set) => ({
  settings: defaultSettings,

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),

  updateBusinessHours: (hours) =>
    set((state) => ({
      settings: {
        ...state.settings,
        businessHours: hours,
      },
    })),

  resetSettings: () =>
    set({
      settings: defaultSettings,
    }),
}));
