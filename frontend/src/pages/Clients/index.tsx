import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Phone, Mail, User } from "lucide-react";
import {
  initialClients,
  initialLoans,
  type Client,
  type Loan,
} from "../../types/general.d";
import { AddClientModal } from "./AddClientModal";
import { Link, useNavigate } from "react-router";
import ClientCard from "../../components/clients/ClientCard";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useAuthStore } from "../../store/auth.store";

import { useClientStore } from "../../store/client.store";

import {
  GET_CLIENTS,
  type GetClientsResponse,
  type GetClientsVars,
} from "../../graphql/client.queries";
import ClientsFilter from "./ClientsFilter";
import Pagination from "../../components/Pagination";
import { usePaginationFilterStore } from "../../store/PaginationFilter";
import { formatCurrency } from "../../common/funcs";
interface ClientListProps {
  clients: Client[];
  loans: Loan[];
  onViewClient: (clientId: string) => void;
  onAddClient: (client: Omit<Client, "id" | "createdAt">) => void;
}

export function ClientList() {
  const [searchTerm, setSearchTerm] = useState("");

  /*   { clients, loans, onViewClient, onAddClient }: ClientListProps */
  //const [clients, setClients] = useState(initialClients);
  const [loans, setLoans] = useState(initialLoans);
  const navigate = useNavigate();

  const authStore = useAuthStore();
  const { clients, setClients } = useClientStore();

  const {pagination,filters,setTotal,setPage} = usePaginationFilterStore()

  const [_user, { data, loading, error }] = useLazyQuery<
    GetClientsResponse,
    GetClientsVars
  >(GET_CLIENTS, {
    fetchPolicy: "network-only", // 🔥
  });
  
  useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      console.log(filters);
      const response: any = await _user({
        variables: {
          userId: String(authStore.user!._id),
          filter: {
            nickname: "",
          },
          pagination: {
            page: 1,
            limit: 10,
          },
        },
      });

      /* console.log("asdasldknasdj");
      console.log(response, "classroomss", data);
 */
      if (data) {
        const {data:clients,pagination:_pagination } = data.getFilterClients;

        setClients(clients ?? []);
        setTotal(_pagination.total);
        
      }
    };

    /*  if (!clients.length)  */ fetch();

    return () => {
      console.log("asdasdas");
    };
  }, [authStore.user, data, filters,pagination.page]);

  /*   const filteredClients =
    clients.filter(
      (client) =>
        client.phone!.includes(searchTerm) ||
        client.email!.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []; */

  const getClientStats = (clientId: string) => {
    const clientLoans = loans.filter((l) => l.clientId === clientId);
    const activeLoans = clientLoans.filter((l) => l.status === "activo");
    const totalDebt = activeLoans.reduce((sum, l) => sum + l.totalAmount, 0);
    return {
      totalLoans: clientLoans.length,
      activeLoans: activeLoans.length,
      totalDebt,
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-2">Clientes</h2>
          <p className="text-gray-600">Gestiona tus clientes y sus préstamos</p>
        </div>
        <AddClientModal />
      </div>

      {/* Búsqueda */}
     {/*  {
        clients.length !==0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cliente por nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
        )
      } */}

      <ClientsFilter></ClientsFilter>
 
        {
            pagination.total > pagination.pageSize && (
                <Pagination
                changePage={(page:number)=>{
                    setPage(page)
                }}
                currentPage={pagination.page} totalPages={pagination.totalPages}></Pagination>
            )
        }
       
      {/* Lista de clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => {
          //const stats = getClientStats(client._id);
          return <ClientCard key={client._id} client={client}></ClientCard>
          
         
          
          {/*  <Card key={client._id}  client={client}></Card> */};
        })}
      </div>

      {clients.length === 0 && (
       <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No tienes clientes registrados </p>
            </div>
      )}
    </div>
  );
}

{
  /* 


          );
        }
*/
}




 function Card({client}) {

    const stats = {
        totalLoans:0,
        activeLoans:0,
        totalDebt:0
    }
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{client.name}</h3>
                  <p className="text-sm text-gray-500">Cliente desde {new Date(client.createdAt).toLocaleDateString('es-ES')}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Préstamos</p>
                    <p className="text-gray-900">{stats.totalLoans}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Activos</p>
                    <p className="text-gray-900">{stats.activeLoans}</p>
                  </div>
                </div>
                {stats.activeLoans > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">Deuda Total</p>
                    <p className="text-green-600">{formatCurrency(stats.totalDebt)}</p>
                  </div>
                )}
              </div>

                 <button
                onClick={() => { 
                    
                   // navigate("/clients/"+client.id) 
                }}/* onViewClient(client.id) */
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
               
                <Eye className="w-4 h-4" />
                Ver Detalle
              
                
              </button>
          
           </div>  
  )
}
