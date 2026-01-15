import { create } from "zustand";
import { persist } from "zustand/middleware";
import { request } from "../services/api/request";
import { jwtDecode } from "jwt-decode";
//import { parseErrors2Zod } from "../utils/errors";
// =========================
// INTERFACES
// =========================
//const API = "http://localhost:3000";
import { parseZodErrors } from "../errors/utils";
import type { ILender } from "../types/general";

export interface LenderState {
  lender: ILender | null;
  loading: boolean;
  errors: any | null;
}

export interface LenderActions {
  setLender: (Lender: ILender | null) => void;
  loadLender:(userId:string)=>void;
}

export type LenderStore = LenderState & LenderActions;

export const useLenderStore = create<LenderStore>((set, get) => ({
  lender: null,
  loading: false,
  errors: {},

  loadLender:async(userId)=>{

    try {
          const response = await request({
          url: "lender/" + userId,
          method: "GET",
        });
  
        set({ lender: response.data });
    } catch (error) {
        
    }
  },
  setLender: (lender) =>
    set((state) => ({
      lender,
    })),

}));
