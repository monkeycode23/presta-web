import React, { useState } from "react";
import { useLoanStore } from "../../store/loan.store";
import type { ILoan } from "../../types/general";
import { usePaymentStore } from "../../store/payment.store";
import LoanCard from "../../components/loans/LoanCard";
import { Filter, TrendingUp } from "lucide-react";
import { AddLoanModal } from "./AddLoanModal";
import Tag from "../../components/Tag";

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


function PaymentFilterDropdown() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState([]);
  const [order, setOrder] = useState("newest");

  const [disbursementDate, setDisbursementDate] = useState({
    from: "",
    to: "",
  });

  const [amount, setAmount] = useState({ from: "", to: "" });

  const [installments, setInstallments] = useState({
    from: "",
    to: "",
  });
  const [filtrosActivos, setFiltrosActivos] = useState<any>({
    orden: "newest",
  });
  const [filtrosVisibles, setFiltrosVisibles] = useState<boolean>(false);

  const toggleStatus = (value:any) => {
    setStatus((prev:any) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setStatus([]);
    setOrder("newest");
    setDisbursementDate({ from: "", to: "" });
    setAmount({ from: "", to: "" });
    setInstallments({ from: "", to: "" });
  };

  const quitarFiltro = (clave: any, valor = null) => {
    const nuevos: any = { ...filtrosActivos };

    if (clave === "estadoCuota" && valor) {
      const nuevaLista = nuevos.estadoCuota.filter((e: any) => e !== valor);
      if (nuevaLista.length > 0) {
        nuevos.estadoCuota = nuevaLista;
      } else {
        delete nuevos.estadoCuota;
      }
      //setEstadoCuotasSeleccionadas(nuevaLista);
    } else {
      delete nuevos[clave];
      /*  if (clave === 'nombre') {
        setNombre('');
      } else if (clave === 'cantidadPrestamos') {
        setCantidadPrestamos(0);
      } else if (clave === 'estadoCuota') {
        setEstadoCuotasSeleccionadas([]);
      } */
    }

    setFiltrosActivos(nuevos);
  };

  return (
    <div className="relative inline-block">
      <div className="flex gap-2 ">

   <button
          onClick={() => setOpen(!open)}
          className="flex gap-1 justify-center items-center border border-gray-300 px-1 rounded-md"
        >
            <Filter className="" size={15}></Filter>
          Filtros
        </button>

        <div className=" flex flex-wrap gap-2">
          {filtrosActivos.orden && (
            <Tag color="blue" onClose={() => quitarFiltro("orden")}>
              orden: {filtrosActivos.orden}
            </Tag>
          )}
          {filtrosActivos.status &&
            filtrosActivos.status.map((estado: any) => (
              <Tag
                key={estado}
                color="orange"
                onClose={() => quitarFiltro("estado", estado)}
              >
                prestamo: {estado}
              </Tag>
            ))}

          {/*  {filtrosActivos. &&
          filtrosActivos.estadoCuota.map((estado:any) => (
            <Tag key={estado} color="green" onClose={() => quitarFiltro('estadoCuota', estado)}>
              Cuota: {estado}
            </Tag>
          ))}

        {filtrosActivos.cantidadPrestamos && (
          <Tag color="purple" onClose={() => quitarFiltro('cantidadPrestamos')}>
            Préstamos: {filtrosActivos.cantidadPrestamos != "sin prestamos activos" ?filtrosActivos.cantidadPrestamos+" o mas" : filtrosActivos.cantidadPrestamos}
          </Tag>
        )} */}
        </div>

       
      </div>
      {/* Botón */}

      {/* Popup */}
      {open && (
        <div
          className="
            absolute left-0 mt-2
            w-[90vw] max-w-3xl
            bg-white rounded-xl shadow-xl
            border border-gray-200
            z-50
          "
        >
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ESTADO */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Estado</h4>
              <div className="space-y-2">
                {STATUS_OPTIONS.map((option:any) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm"
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

            {/* ORDEN */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Orden</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="order"
                    checked={order === "newest"}
                    onChange={() => setOrder("newest")}
                    className="accent-blue-500"
                  />
                  Más recientes
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="order"
                    checked={order === "oldest"}
                    onChange={() => setOrder("oldest")}
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
                  type="date"
                  value={disbursementDate.from}
                  onChange={(e) =>
                    setDisbursementDate((p) => ({
                      ...p,
                      from: e.target.value,
                    }))
                  }
                  className="input"
                />
                <input
                  type="date"
                  value={disbursementDate.to}
                  onChange={(e) =>
                    setDisbursementDate((p) => ({
                      ...p,
                      to: e.target.value,
                    }))
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
                  value={amount.from}
                  onChange={(e) =>
                    setAmount((p) => ({ ...p, from: e.target.value }))
                  }
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={amount.to}
                  onChange={(e) =>
                    setAmount((p) => ({ ...p, to: e.target.value }))
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
                  value={installments.from}
                  onChange={(e) =>
                    setInstallments((p) => ({
                      ...p,
                      from: e.target.value,
                    }))
                  }
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={installments.to}
                  onChange={(e) =>
                    setInstallments((p) => ({
                      ...p,
                      to: e.target.value,
                    }))
                  }
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              onClick={clearFilters}
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
        </div>
      )}
    </div>
  );
}

export default PaymentFilterDropdown;

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