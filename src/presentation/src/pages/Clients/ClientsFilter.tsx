import React,{useState,useEffect} from 'react';
/* import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/pagination'; */


import {
  Filter,
  X,
  ChevronDown,
  CheckCircle,
  AlarmClock,
  Clock,
  AlertCircle,
  Eye,
  Phone,
  Mail
} from 'lucide-react';

import { usePaginationFilterStore } from '../../store/PaginationFilter';

 import Checkbox from '../../components/ui/form/input/Checkbox';
import Radio from '../../components/ui/form/input/Radio'; 



const KeyNameMap:any = {
  payments: {
    pagadas: "paid",
    expiradas: "expired",
    pendientes: "pending",
    incompletas: "incomplete",
  },

  loans: {
    "En-curso": "active",
    Completado: "completed",
    Cancelado: "canceled",
    Pendiente: "pending",
  },
};
const cuotaEstados = ['pagadas', 'expiradas', 'pendientes', 'incompletas'];



const estadoPrestamos =[
  "En-curso",
  "Completado",
  "Cancelado",
  "Pendiente",
]


const ClientsFilter = () => {
  const [nombre, setNombre] = useState('');
  const [filtrosVisibles, setFiltrosVisibles] = useState<boolean>(false);
  const [estadoCuotasSeleccionadas, setEstadoCuotasSeleccionadas] = useState<any[]>([]);
  const [cantidadPrestamos, setCantidadPrestamos] = useState(1);
  const [filtrosActivos, setFiltrosActivos] = useState<any>({});
  const [estadoPrestamoSeleccionadas, setEstadoPrestamoSeleccionadas] = useState<any[]>([]);
 
  const { filters,setFilters } = usePaginationFilterStore()
  useEffect(() => {
    // Inicializar filtros activos con valores por defecto

    
    setFilters({
      nickname: '',
      payments: [],
      loans: [],
      loansLen: ''
    });


  }, []);
  const estadoIcons:any = {
  pagadas: <CheckCircle className="w-4 h-4 text-green-500" />,
  expiradas: <AlarmClock className="w-4 h-4 text-red-500" />,
  pendientes: <Clock className="w-4 h-4 text-blue-500" />,
  incompletas: <AlertCircle className="w-4 h-4 text-orange-500" />
};


const cantidadPrestamosValues =["sin prestamos activos",1,3,5]



  const updateFiltro = (clave:any, valor:any) => {
    setFiltrosActivos((prev:any) => {
      const nuevos:any = { ...prev };
      if (valor === '' || (Array.isArray(valor) && valor.length === 0)) {
        delete nuevos[clave];
      } else {
        nuevos[clave] = valor;
      }
      return nuevos;
    });
  };

  // Nombre
  const handleNombreChange = (e:any) => {
    const value = e.target.value;
    setNombre(value);
    updateFiltro('nombre', value);
   setFilters({
      ...filters,
      nickname: value,        
      
    });
  };

  const toggleEstadoPrestamo = (estado:string) => {
    const nuevaLista = estadoPrestamoSeleccionadas.includes(estado)

      ? estadoPrestamoSeleccionadas.filter((e) => e !== estado)
      : [...estadoPrestamoSeleccionadas, estado];

    setEstadoPrestamoSeleccionadas(nuevaLista);
    updateFiltro('estadoPrestamo', nuevaLista);

   setFilters({
      ...filters,
      loans: nuevaLista,        
      
    });
  };
  // Estado de cuotas múltiple
  const toggleEstadoCuota = (estado:any) => {
    const nuevaLista = estadoCuotasSeleccionadas.includes(estado)
      ? estadoCuotasSeleccionadas.filter((e) => e !== estado)
      : [...estadoCuotasSeleccionadas, estado];

    setEstadoCuotasSeleccionadas(nuevaLista);
    updateFiltro('estadoCuota', nuevaLista);

     setFilters({
      ...filters,
      payments: nuevaLista,        
      
    });

  };

  // Cantidad de préstamos
  const handleCantidadChange = (e:any) => {
    const value = e;

   
     setCantidadPrestamos(value);
    updateFiltro('cantidadPrestamos', value); 
     setFilters({
      ...filters,
      loansLen: value,        
      
    });
  };

  const quitarFiltro = (clave:any, valor = null) => {
    const nuevos:any = { ...filtrosActivos };

    if (clave === 'estadoCuota' && valor) {
      const nuevaLista = nuevos.estadoCuota.filter((e:any) => e !== valor);
      if (nuevaLista.length > 0) {
        nuevos.estadoCuota = nuevaLista;
      } else {
        delete nuevos.estadoCuota;
      }
      setEstadoCuotasSeleccionadas(nuevaLista);
    } else {
      delete nuevos[clave];
      if (clave === 'nombre') {
        setNombre('');
      } else if (clave === 'cantidadPrestamos') {
        setCantidadPrestamos(0);
      } else if (clave === 'estadoCuota') {
        setEstadoCuotasSeleccionadas([]);
      }
    }

    setFiltrosActivos(nuevos);
  };

  return (
    <div className="w-full  mx-auto p-4 bg-white dark:bg-gray-900 dark:border-gray-800">
      {/* Input + botón de filtros */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={nombre}
          onChange={handleNombreChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        <button
          onClick={() => setFiltrosVisibles((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown de filtros */}
      {filtrosVisibles && (
        <div className=" mt-2 border border-gray-200 rounded-md p-4 shadow-md bg-white z-10 relative grid grid-cols-1 md:grid-cols-3 gap-4 dark:bg-gray-900 dark:border-gray-800">
          {/* Columna: Cuotas */}
          <div>
            <h3 className="font-semibold mb-2">Estado de cuotas</h3>
            {cuotaEstados.map((estado) => (
            <label key={estado} className="flex items-center gap-2 mb-1 cursor-pointer">
              <Checkbox
               
                checked={estadoCuotasSeleccionadas.includes(KeyNameMap.payments[estado])}
                onChange={() => toggleEstadoCuota(KeyNameMap.payments[estado])}
              />
              <span className="flex items-center gap-1 capitalize">
                {estadoIcons[estado]} {estado}
              </span>
            </label>
          ))}
          </div>
          {/* Columna: estado de préstamos */}
          <div className=''>
            <h3 className="font-semibold mb-2">Estado Prestamos </h3>
            {
              estadoPrestamos.map((estado,index)=>(
              <label key={index} className="flex items-center gap-2 mb-1 cursor-pointer">
              <Checkbox
                checked={estadoPrestamoSeleccionadas.includes(KeyNameMap.loans[estado])}
                onChange={() => toggleEstadoPrestamo(KeyNameMap.loans[estado])}
              />
              <span className="flex items-center gap-1 capitalize">
                {estadoIcons[estado]} {estado}
              </span>
            </label>
              ))
            }
          </div>
          
          {/* Columna: Cantidad de préstamos */}
         {/*  <div className=''>
            <h3 className="font-semibold mb-2">Prestamos Activos</h3>
            {
              cantidadPrestamosValues.map((cant,index)=>(
              <label className='flex gap-1 mb-1' key={index}>
                <Radio
                value={cant}
                checked={cantidadPrestamos==cant }
                onChange={handleCantidadChange}
                ></Radio>
                <span className="flex items-center gap-1 capitalize">
                {cant ==0 ? "Sin Prestamos" : cant == 5 ? "5 o mas": cant == 1 ? "1 o mas" : cant ==3 ? "3 o mas" : cant  }
              </span>
              </label>
              ))
            }
          </div> */}
        </div>
      )}

      {/* Etiquetas de filtros activos */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filtrosActivos.nombre && (
          <Tag color="blue" onClose={() => quitarFiltro('nombre')}>
            Nombre: {filtrosActivos.nombre}
          </Tag>
        )}
        {filtrosActivos.estadoPrestamo &&
          filtrosActivos.estadoPrestamo.map((estado:any) => (
            <Tag key={estado} color="orange" onClose={() => quitarFiltro('estadoPrestamo', estado)}>
              Prestamo: {estado}
            </Tag>
          ))}

        {filtrosActivos.estadoCuota &&
          filtrosActivos.estadoCuota.map((estado:any) => (
            <Tag key={estado} color="green" onClose={() => quitarFiltro('estadoCuota', estado)}>
              Cuota: {estado}
            </Tag>
          ))}

        {filtrosActivos.cantidadPrestamos && (
          <Tag color="purple" onClose={() => quitarFiltro('cantidadPrestamos')}>
            Préstamos: {filtrosActivos.cantidadPrestamos != "sin prestamos activos" ?filtrosActivos.cantidadPrestamos+" o mas" : filtrosActivos.cantidadPrestamos}
          </Tag>
        )}
      </div>
    </div>
  );
};

// Etiqueta reutilizable con color dinámico
const Tag = ({ children, onClose, color }:any) => {
  const colorMap:any = {
    orange: 'bg-orange-100 text-orange-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className={`flex items-center px-3 py-1 rounded-full text-sm ${colorMap[color] || 'bg-gray-200 text-gray-800'}`}>
      <span className="mr-2">{children}</span>
      <button
      title='button'
      onClick={onClose} className="hover:text-red-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};



export default ClientsFilter


