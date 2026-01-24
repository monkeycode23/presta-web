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
import type { User } from "../types/general";
import { fa } from "zod/v4/locales";

export interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  errors: string | null;
  tempToken: string | null;
}

export interface UserActions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  loading: boolean;
  errors: any | null;
  login: (data: any) => Promise<any>;
  register: (token: any) => Promise<{ errors?: any; success: boolean }>;
  loadUser: () => void;
  logout: () => void;
  setErrors: (errors: any) => void;
  setTempToken: (token: string) => void;
}

export type UserStore = UserState & UserActions;

export const useAuthStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      errors: null,
      tempToken: "",
      setTempToken: (token) => set({ tempToken: token }),
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token: token }),
      setErrors: (errors) => set({ errors }),
      login: async (data) => {
        try {
          if (!data) throw new Error("No data provided");
          set({ loading: true, errors: null });

          const response = await request({
            url: "auth/login",
            method: "POST",
            data: data,
          });

          console.log(response,"response from login store")
          if (!response.success) {
            //const errs = parseErrors2Zod(response.errors);
            set({ errors: response.errors});
            return false;
          }

          set({ loading: false });

          const token = response.data.token;

          console.log(token,"token from login")

          set({ token, loading: false /* user:response.data.user */ });

            return true;
       
        }
         catch (error:any) {
          console.error("Error en login:", error);
         
         
          return false;
        }
        finally {
          set({ loading: false });
        }
       
      },

      register: async (data) => {
        if (!data) return { success: false };

        set({ loading: true, errors: null });

        const response = await request({
          url: "auth/register",
          method: "POST",
          data: {
            ...data,
            username: data.name,
            confirmPassword: data.password,
          },
        });

        set({ loading: false });

        if (response.success) {
          const token = response.data.token;
          console.log(response);
          const decoded = jwtDecode(token) as { userId: string };
          console.log(decoded);

          set({
            token,
            loading: false,
            
          });
         
          return { success: true };
        }

        //const parsedErrors = parseErrors2Zod(response.errors);

        return { errors: response.errors, success: false };
      },

      loadUser: async () => {
        const token = get().token;

        if (!token) return;

        const decoded = jwtDecode(token) as any;

        console.log(decoded);

        if (!decoded) return;

        const userId = decoded.data.userId;

        const response = await request({
          url: "users/" + userId,
          method: "GET",
        });
  
        set({ user: response.data });
      },


      refresh:async()=>{

        
        const response = await request({
          url: "/refresh",
          method: "POST",
         
        });
        
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),

    {
      name: "user-store",
      partialize: (state) => ({
        token: state.token, // solo persistimos token
      }),
    }
  )
);
