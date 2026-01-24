/* import React,{useState} from 'react';
import { Users, TrendingUp, DollarSign, AlertCircle, Calendar, CheckCircle, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import type { Client, Loan, Payment, ActivityLog,Employee } from '../../types/general';
import { initialClients,initialEmployees,initialLoans,} from '../../types/general.d'; */
import StaticsCards from './StaticsCards';
//import MonthlyChart from './MonthlyChart';
//import FrecuencyLoansChart from './FrecuencyLoansChart';
import NextPayments from './NextPayments';
import EmployeeActivity from './EmployeeActivity';



export function Dashboard() {



  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Resumen general de tu negocio de préstamos</p>
      </div>

      {/* Tarjetas de estadísticas */}
        <StaticsCards></StaticsCards>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de recaudación mensual */}
       {/*  <MonthlyChart></MonthlyChart> */}
        {/* Gráfico de préstamos por frecuencia */}
     {/*   <FrecuencyLoansChart></FrecuencyLoansChart> */}
      </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos pagos */}
      <NextPayments></NextPayments>
     
      {/* Actividad de Empleados */}

      <EmployeeActivity></EmployeeActivity>
      </div>
     
      
    </div>
  );
}