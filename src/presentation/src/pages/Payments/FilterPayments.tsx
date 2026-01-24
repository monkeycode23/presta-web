import React, { useState } from "react";
import { useLoanStore } from "../../store/loan.store";
import type { ILoan } from "../../types/general";
import { usePaymentStore } from "../../store/payment.store";
import LoanCard from "../../components/loans/LoanCard";
import { CreditCard, Filter, TrendingUp } from "lucide-react";

import Tag from "../../components/Tag";
import { usePaginationFilterStore } from "../../store/pagination.filter";

const FILTERS = [
  {
    label: "Todos",
    count: 12,
    value: "all",
  },
  {
    label: "En curso",
    count: 2,
    value: "active",
  },
  {
    label: "Completados",
    count: 2,
    value: "completed",
  },
  {
    label: "Pendientes",
    count: 3,
    value: "pending",
  },
  {
    label: "Cancelados",
    count: 3,
    value: "cancelled",
  },
];

const STATUS_OPTIONS = [
  { label: "Pendientes", value: "pending" },
  { label: "Pagados", value: "paid" },
  { label: "Incompletos", value: "incomplete" },
  { label: "Expirados", value: "expired" },
];


function PaymentFilterDropdown() {
  const [open, setOpen] = useState(false);
  
  const {filters,updateFilterValue} = usePaginationFilterStore()

  const payments_date = filters.payments_date

  const quitarFiltro = (clave: any, value :any) => {
    
    if(clave == "estado"){

        const newState = payments_date.status.filter((s:any) => s !== value)

        console.log(newState)
        updateFilterValue("payments_date",{
            status: newState
        })
        
    }

    if(clave == "cliente"){
       
        updateFilterValue("payments_date",{
            client: ""
        })
        
    }
  };

    const toggleStatus = (value:any) => {

        const status = filters.payments_date.status;

        updateFilterValue("payments_date",{
            status: status.includes(value) ? status.filter((s:any) => s !== value) : [...status, value]
        })

        console.log(filters.payments_date)
    }
  return (
    <div className="relative mb-2">
      <div className="flex gap-4 ">

           <button
          onClick={() => setOpen(!open)}
          className="flex gap-1 justify-center items-center  px-1 rounded-md"
        >
            <Filter className="" size={15}></Filter>
          Filtros
        </button>
        <div className=" flex flex-wrap gap-2">
          { payments_date?.order && (
            <Tag color="blue" >
              orden: {payments_date.order}
            </Tag>
          )}
          { payments_date?.client.length ? (
            <Tag color="purple"
            
            onClose={() => quitarFiltro("cliente",null)}
            >
              cliente: {payments_date.client}
              
            </Tag>
          ) : (<></>)}
          {payments_date?.status &&
            payments_date.status.map((estado: any) => (
              <Tag
                key={estado}
                color="orange"
                onClose={() => quitarFiltro("estado", estado)}
              >
               <span className="flex gap-2 justify-center items-center px-1 text-xs">
                 <CreditCard width={15}></CreditCard> {estado}</span>
              </Tag>
            ))}

  
        </div>

     
      </div>
      {/* Botón */}

      {/* Popup */}
      {open && (
        <FilterPane setOpen={setOpen} toggleStatus={toggleStatus}></FilterPane>
      )}
    </div>
  );
}



const FilterPane = ({setOpen,toggleStatus}:any)=>{


    const {updateFilterValue,filters,resetFilters } = usePaginationFilterStore()

    const payments_date = filters.payments_date

    return ( <div
          className="
            absolute left-0 mt-2
            w-[90vw] max-w-3xl
            bg-white rounded-xl shadow-xl
            border border-gray-200
            z-50
          "
        >
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">

             <div className="col-span-2">
              <h4 className="text-sm font-semibold mb-2">Cliente</h4>
              <div className="space-y-2">
                <input
              type="text"
              value={payments_date.client}
              onChange={(e) => updateFilterValue("payments_date",{
                        ...payments_date,
                        client:e.target.value
                    })}    
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="nombre del cliente"
            />
              </div>
            </div>
            {/* ESTADO */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Estado</h4>
              <div className="space-y-2">
                {STATUS_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={payments_date.status.includes(option.value)}
                      onChange={() => toggleStatus(option.value)}
                      className="accent-blue-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* ORDEN */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Orden</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="order"
                    checked={payments_date.order === "newest"}
                    onChange={() => updateFilterValue("payments_date",{
                        ...payments_date,
                        order:"newest"
                    })}
                    className="accent-blue-500"
                  />
                  Más recientes
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="order"
                     checked={payments_date.order === "oldest"}
                    onChange={() => updateFilterValue("payments_date",{
                        ...payments_date,
                        order:"oldest"
                    })}
                    className="accent-blue-500"
                  />
                  Más antiguos
                </label>
              </div>
            </div>

       

            {/* CUOTAS */}
           
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              onClick={()=>resetFilters("payments")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar
            </button>
            <button
              onClick={() => setOpen(false)}
              className="
                px-4 py-2 rounded-lg
                bg-blue-500 text-white text-sm
                hover:bg-blue-600
              "
            >
              Aplicar
            </button>
          </div>
        </div>)
}

export default PaymentFilterDropdown

/* function LoanFilterDropdown({ status, setStatus, order, setOrder }) {
  const [open, setOpen] = useState(false);

  const toggleStatus = (value) => {
    setStatus((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setStatus([]);
    setOrder("newest");
  };

  return (
    <div className="relative inline-block">
      {/* Botón principal
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          px-4 py-2 rounded-lg
          bg-blue-500 text-white
          hover:bg-blue-600
          transition
        "
      >
        Filtros
        {(status.length > 0 || order !== "newest") && (
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
            Activos
          </span>
        )}
      </button>

      {/* Popup *
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-64
            bg-white rounded-xl shadow-xl
            border border-gray-200
            z-50
          "
        >
          <div className="p-4 space-y-4">
            {/* Estados 
            <div>
              <h4 className="text-sm font-semibold mb-2">Estado</h4>
              <div className="space-y-2">
                {STATUS_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={status.includes(option.value)}
                      onChange={() => toggleStatus(option.value)}
                      className="accent-blue-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Orden 
            <div>
              <h4 className="text-sm font-semibold mb-2">Orden</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="order"
                    value="newest"
                    checked={order === "newest"}
                    onChange={() => setOrder("newest")}
                    className="accent-blue-500"
                  />
                  Más recientes
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="order"
                    value="oldest"
                    checked={order === "oldest"}
                    onChange={() => setOrder("oldest")}
                    className="accent-blue-500"
                  />
                  Más antiguos
                </label>
              </div>
            </div>
          </div>

          {/* Footer 
          <div className="flex justify-between gap-2 px-4 py-3 border-t">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar
            </button>
            <button
              onClick={() => setOpen(false)}
              className="
                px-4 py-1.5 rounded-lg
                bg-blue-500 text-white text-sm
                hover:bg-blue-600
              "
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


function LoanStatusFilter({ status, setStatus }) {
  const handleSelect = (value) => {
    if (value === "all") {
      setStatus([]); // todos
    } else {
      setStatus([value]);
    }
  };

  const isActive = (value) =>
    value === "all" ? status.length === 0 : status.includes(value);

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleSelect(filter.value)}
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-200

            ${
              isActive(filter.value)
                ? "bg-blue-500 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          <span>{filter.label}</span>
          <span
            className={`
              text-xs px-2 py-0.5 rounded-full
              ${
                isActive(filter.value)
                  ? "bg-white/20 text-white"
                  : "bg-gray-300 text-gray-700"
              }
            `}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
}
 */