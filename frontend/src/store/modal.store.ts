import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipos
export type SortOrder = "asc" | "desc";

export interface ModalState {
    
  isOpen:boolean
}

export interface FilterState {
  search: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export interface ModalStore {
  
    modals:Record<string,ModalState>
  // Actions
  setModal: ( key: string) => void;
  toggleModal: ( key: string) => void;
  openModal: ( key: string) => void;
  closeModal: ( key: string) => void;
}

// Creamos la tienda con persistencia
export const useModalStore = create<ModalStore>()(
  persist(
    (set, get) => ({
      modals: {},
      
      setModal: (key) =>
        set((state) => ({
            modals:{
                ...state.modals,
            [key]:{
                isOpen:false
            }
            }
            
        })),

        toggleModal: (key) =>
        set((state) => ({
           modals:{
             ...state.modals,
            [key]:{
                isOpen:!state.modals[key].isOpen
            }
           }
        })),
         openModal: (key) =>
        set((state) => ({
           modals:{
             ...state.modals,
            [key]:{
                isOpen:true
            }
           }
        })),
         closeModal: (key) =>
        set((state) => ({
            modals:{
                ...state.modals,
            [key]:{
                isOpen:false
            }
            }
        }))


    }),
    {
      name: "modals-store", // nombre para el almacenamiento persistente
      // Establece el almacenamiento persistente (localStorage)
      partialize: (state) => ({
        modals: state.modals, // Persistir solo los filtros
        // Persistir solo la paginación
      }),
    }
  )
);
