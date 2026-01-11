import React, { useState } from "react";
import { useLoanStore } from "../../store/loan.store";
import type { ILoan } from "../../types/general";
import { usePaymentStore } from "../../store/payment.store";
import LoanCard from "../../components/loans/LoanCard";
import { Filter, TrendingUp } from "lucide-react";
import { AddLoanModal } from "./AddLoanModal";
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
  { label: "En curso", value: "active" },
  { label: "Completados", value: "completed" },
  { label: "Pendientes", value: "pending" },
  { label: "Cancelados", value: "cancelled" },
];


function LoanFilterDropdown2() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState([]);
  const [order, setOrder] = useState("newest");

  const {filters,updateFilterValue} = usePaginationFilterStore()

  

  

  const quitarFiltro = (clave: any, valor = null) => {
    
  };

    const toggleStatus = (value:any) => {

        const status = filters.loans.status;

        updateFilterValue("loans",{
            status: status.includes(value) ? status.filter((s:any) => s !== value) : [...status, value]
        })

        console.log(filters.loans)
    }
  return (
    <div className="relative inline-block">
      <div className="flex gap-4 ">

           <button
          onClick={() => setOpen(!open)}
          className="flex gap-1 justify-center items-center border border-gray-300 px-1 rounded-md"
        >
            <Filter className="" size={15}></Filter>
          Filtros
        </button>
        <div className=" flex flex-wrap gap-2">
          {filters.loans.order && (
            <Tag color="blue" onClose={() => quitarFiltro("order")}>
              orden: {filters.loans.order}
            </Tag>
          )}
          {filters.loans.status &&
            filters.loans.status.map((estado: any) => (
              <Tag
                key={estado}
                color="orange"
                onClose={() => quitarFiltro("estado", estado)}
              >
                prestamo: {estado}
              </Tag>
            ))}

        {filters.loans.disbursementDate.from ?
          
            <Tag  color="green" onClose={() =>{}}>
              F.Desmb: {filters.loans.disbursementDate.from} / {filters.loans.disbursementDate.to}
            </Tag> :<></>
          }

                  {filters.loans.amount.from ? (
          <Tag color="purple" onClose={() => quitarFiltro('cantidadPrestamos')}>
            monto: ${filters.loans.amount.from}/ ${filters.loans.amount.to}
          </Tag>):<></>
        } 

              {filters.loans.installments.from ? (
          <Tag color="gray" onClose={() => quitarFiltro('cantidadPrestamos')}>
            cuotas: {filters.loans.installments.from}/ {filters.loans.installments.to}
          </Tag>) :<></>
        }
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


  
  

    return ( <div
          className="
            absolute left-0 mt-2
            w-[90vw] max-w-3xl
            bg-white rounded-xl shadow-xl
            border border-gray-200
            z-52
          "
        >
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      checked={filters.loans.status.includes(option.value)}
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
                    checked={filters.loans.order === "newest"}
                    onChange={() => updateFilterValue("loans",{
                        ...filters.loans,
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
                     checked={filters.loans.order === "oldest"}
                    onChange={() => updateFilterValue("loans",{
                      ...filters.loans,
                      order:"oldest"
                      
                    })}
                    className="accent-blue-500"
                  />
                  Más antiguos
                </label>
              </div>
            </div>

            {/* FECHA DE DESEMBOLSO */}
            <div>
              <h4 className="text-sm font-semibold mb-2">
                Fecha de desembolso
              </h4>
              <div className="flex gap-2">
                <input
                title="date"
                  type="date"
                  value={filters.loans.disbursementDate.from}
                  onChange={(e) =>
                    updateFilterValue("loans",{
                      ...filters.loans,
                      disbursementDate:{
                        ...filters.loans.disbursementDate,
                        from: e.target.value,
                      }
                      
                    })
                  }
                  className="input"
                />
                <input
                title="date"
                  type="date"
                  value={filters.loans.disbursementDate.to}
                  onChange={(e) =>
                    updateFilterValue("loans",{
                      ...filters.loans,
                      disbursementDate:{
                        ...filters.loans.disbursementDate,
                        to: e.target.value,
                      }
                    })
                  
                  }
                  className="input"
                />
              </div>
            </div>

            {/* MONTO */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Monto</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.loans.amount.from}
                  onChange={(e) =>
                    updateFilterValue("loans",{
                      ...filters.loans,
                      amount:{
                        ...filters.loans.amount,
                        from: e.target.value,
                      }
                      
                    })                  }
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.loans.amount.to}
                  onChange={(e) =>
                    updateFilterValue("loans",{
                      ...filters.loans,
                      amount:{
                        ...filters.loans.amount,
                        to: e.target.value,
                      }
                    })
                  }
                  className="input"
                />
              </div>
            </div>

            {/* CUOTAS */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Cantidad de cuotas</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.loans.installments.from}
                  onChange={(e) =>
                    updateFilterValue("loans",{
                      ...filters.loans,
                      installments:{
                         ...filters.loans.installments,
                        from: e.target.value,
                      }
                      
                    })
                  }
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.loans.installments.to}
                  onChange={(e) =>
                    updateFilterValue("loans",{
                      ...filters.loans,
                      installments:{
                         ...filters.loans.installments,
                        to: e.target.value,
                      }
                    })
                  }
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              onClick={()=>resetFilters("loans")}
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

export default LoanFilterDropdown2;

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