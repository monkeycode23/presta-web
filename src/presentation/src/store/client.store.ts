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
  updateClient: (clientId:string,client: Partial<IClient>) => void;
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
  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),
 updateClient: (clientId: string, updatedClient: Partial<IClient>) =>
  set((state) => {
    const result: any = {
      clients: state.clients.map((c) =>
        c._id === clientId
          ? {
              ...c,  // Mantén las propiedades existentes del cliente
              ...updatedClient,  // Solo actualiza las propiedades que han cambiado
            }
          : c
      ),
    };

    // Si `selectedClient` es el que estamos actualizando, también lo modificamos
    if (state.selectedClient && state.selectedClient._id === clientId) {
      result.selectedClient = {
        ...state.selectedClient,  // Mantén las propiedades actuales de selectedClient
        ...updatedClient,  // Solo actualiza las propiedades que han cambiado
      };
    }

    return result;
  }),

  removeClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((c) => c._id !== id),
    })),
  selectClient: (client) => set({ selectedClient: client }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
