import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipos
export type SortOrder = "asc" | "desc";

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface FilterState {
  search: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PaginationFilterStore {
  filters: Record<string, any>;
  pagination: Record<string, PaginationState>;
  sortBy?: string;
  sortOrder: SortOrder;

  // Actions
  setPage: (page: number, key: string) => void;
  setPageSize: (size: number, key: string) => void;
  setTotal: (total: number, key: string) => void;
  setTotalPages: (total: number, key: string) => void;
  setPagination: ( key: string) => void;
  setFilters: (filters: Partial<any>, key: string) => void;
  updateFilterValue: ( key: string, value:any) => void;
  resetFilters: (key: string) => void;
  setSort: (field: string, order?: SortOrder) => void;
}

// Creamos la tienda con persistencia
export const usePaginationFilterStore = create<PaginationFilterStore>()(
  persist(
    (set, get) => ({
      filters: {},
      pagination: {},
      sortBy: undefined,
      sortOrder: "asc",

      setPage: (page, key) =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            [key]: { ...state.pagination[key], page },
          },
        })),


        updateFilterValue: ( key,value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: { ...state.filters[key],
                ...value
             },
          },
        })),

      setPageSize: (pageSize, key) =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            [key]: { ...state.pagination[key], pageSize, page: 1 },
          },
        })),

      setTotal: (total, key) =>
        set((state) => {
          const { pageSize } = state.pagination[key];
          const totalPages = total > pageSize ? Math.ceil(total / pageSize) : 1;
          return {
            pagination: {
              ...state.pagination,
              [key]: { ...state.pagination[key], total, totalPages },
            },
          };
        }),

      setTotalPages: (total, key) =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            [key]: { ...state.pagination[key], totalPages: total },
          },
        })),

      setFilters: (filters, key) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: { ...state.filters[key], ...filters },
          },
          pagination: {
            ...state.pagination,
            [key]: { ...state.pagination[key], page: 1 },
          },
        })),

          setPagination: ( key) =>
        set((state) => ({
          
          pagination: {
            ...state.pagination,
            [key]: { ...state.pagination[key], page: 1 },
          },
        })),

      resetFilters: (key) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: {},
          },
          pagination: {
            ...state.pagination,
            [key]: { ...state.pagination[key], page: 1 },
          },
        })),

      setSort: (field, order = "asc") =>
        set(() => ({
          sortBy: field,
          sortOrder: order,
        })),
    }),
    {
      name: "pagination-filters-store", // nombre para el almacenamiento persistente
      // Establece el almacenamiento persistente (localStorage)
      partialize: (state) => ({
        filters: state.filters, // Persistir solo los filtros
        pagination: state.pagination, // Persistir solo la paginación
      }),
    }
  )
);
