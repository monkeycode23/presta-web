

// store/loan.store.ts
import { create } from 'zustand';
import type { ILoan } from '../types/general';

interface LoanState {
  loans: ILoan[];
  currentLoan: ILoan | null;
  loading: boolean;
  error: string | null;

  // setters
  setLoans: (loans: ILoan[]) => void;
  setCurrentLoan: (loan: ILoan | null) => void;
  addLoan: (loan: ILoan) => void;
  updateLoan: (id: string, data: Partial<ILoan>) => void;
  removeLoan: (id: string) => void;

  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useLoanStore = create<LoanState>((set) => ({
  loans: [],
  currentLoan: null,
  loading: false,
  error: null,

  setLoans: (loans) =>
    set({ loans }),

  setCurrentLoan: (loan) =>
    set({ currentLoan: loan }),

  addLoan: (loan) =>
    set((state) => ({
      loans: [loan,...state.loans ],
    })),

  updateLoan: (id, data) =>
    set((state) => ({
      loans: state.loans.map((loan) =>
        loan._id === id ? { ...loan, ...data } : loan
      ),
      currentLoan:
        state.currentLoan?._id === id
          ? { ...state.currentLoan, ...data }
          : state.currentLoan,
    })),

  removeLoan: (id) =>
    set((state) => ({
      loans: state.loans.filter((loan) => loan._id !== id),
      currentLoan:
        state.currentLoan?._id === id ? null : state.currentLoan,
    })),

  setLoading: (value) =>
    set({ loading: value }),

  setError: (error) =>
    set({ error }),

  reset: () =>
    set({
      loans: [],
      currentLoan: null,
      loading: false,
      error: null,
    }),
}));
