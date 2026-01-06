import { create } from 'zustand';
 // Ajusta la ruta según tu proyecto
import type { IClient } from '../types/general';



interface ClientStore {
  clients: IClient[];
  selectedClient?: IClient;
  loading: boolean;
  error?: string;

  // Actions
  setClients: (clients: IClient[]) => void;
  addClient: (client: IClient) => void;
  updateClient: (client: IClient) => void;
  removeClient: (id: string) => void;
  selectClient: (client?: IClient) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  selectedClient: undefined,
  loading: false,
  error: undefined,

  setClients: (clients) => set({ clients }),
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  updateClient: (updatedClient) =>
    set((state) => ({
      clients: state.clients.map((c) =>
        c._id === updatedClient._id ? updatedClient : c
      )
    })),
  removeClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((c) => c._id !== id)
    })),
  selectClient: (client) => set({ selectedClient: client }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));
