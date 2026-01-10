

import { create } from "zustand";
import type { IPayment } from "../types/general";

// store/payment.store.ts


interface PaymentState {
  payments: IPayment[];
  currentPayment: IPayment | null;
  selectedPayments:IPayment[]
  loading: boolean;
  error: string | null;

  setPayments: (payments: IPayment[]) => void;
  setCurrentPayment: (payment: IPayment | null) => void;

  addPayment: (payment: IPayment) => void;
  updatePayment: (id: string, data: Partial<IPayment>) => void;
  removePayment: (id: string) => void;

  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;

  reset: () => void;
}



export const usePaymentStore = create<PaymentState>((set) => ({
  payments: [],
  currentPayment: null,
  loading: false,
  error: null,

  selectedPayments:[],
  setPayments: (payments) =>
    set({ payments }),

  setCurrentPayment: (payment) =>
    set({ currentPayment: payment }),

  addPayment: (payment) =>
    set((state) => ({
      payments: [...state.payments, payment],
    })),

  updatePayment: (id, data) =>
    set((state) => ({
      payments: state.payments.map((payment) =>
        payment._id === id ? { ...payment, ...data } : payment
      ),
      currentPayment:
        state.currentPayment?._id === id
          ? { ...state.currentPayment, ...data }
          : state.currentPayment,
    })),

  removePayment: (id) =>
    set((state) => ({
      payments: state.payments.filter((payment) => payment._id !== id),
      currentPayment:
        state.currentPayment?._id === id ? null : state.currentPayment,
    })),

  setLoading: (value) =>
    set({ loading: value }),

  setError: (error) =>
    set({ error }),

  reset: () =>
    set({
      payments: [],
      currentPayment: null,
      loading: false,
      error: null,
    }),
}));
