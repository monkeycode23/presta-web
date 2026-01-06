import { create } from "zustand";

const initialFilters: FilterState = {
  search: "",
};

export type SortOrder = "asc" | "desc";

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages:number;

}

export type GenericFilters = Record<string, unknown>;


export interface FilterState {
  search: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PaginationFilterStore {
  // state
  pagination: PaginationState;
  filters: any;
  sortBy?: string;
  sortOrder: SortOrder;

  // actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotal: (total: number) => void;

  setFilters: (filters: Partial<any>) => void;
  resetFilters: () => void;

  setSort: (field: string, order?: SortOrder) => void;

}

export const usePaginationFilterStore = create<PaginationFilterStore>((set) => ({
  // ===== STATE =====
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages:0
  },

  filters: initialFilters,
  sortBy: undefined,
  sortOrder: "asc",

  // ===== ACTIONS =====
  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, page },
    })),

  setPageSize: (pageSize) =>
    set((state) => ({
      pagination: { ...state.pagination, pageSize, page: 1 },
    })),

  setTotal: (total) =>
    set((state) => ({
      pagination: { ...state.pagination, total },
    })),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 },
    })),

  resetFilters: () =>
    set((state) => ({
      filters: initialFilters,
      pagination: { ...state.pagination, page: 1 },
    })),

  setSort: (field, order = "asc") =>
    set(() => ({
      sortBy: field,
      sortOrder: order,
    })),

/*   resetAll: () =>
    set(() => ({
      pagination: { page: 1, pageSize: 10, total: 0 },
      filters: {},
      sortBy: undefined,
      sortOrder: "asc",
    })), */
}));
