import React,{useState} from 'react';
import { Users, TrendingUp, DollarSign, AlertCircle, Calendar, CheckCircle, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import type { Client, Loan, Payment, ActivityLog,Employee } from '../types/general';
import { initialClients,initialEmployees,initialLoans,} from '../types/general.d';
const generatePayments = (loan: Loan): Payment[] => {
  const payments: Payment[] = [];
  const installmentAmount = loan.totalAmount / loan.installments;
  let currentDate = new Date(loan.startDate);

  for (let i = 0; i < loan.installments; i++) {
    const dueDate = new Date(currentDate);
    
    if (loan.frequency === 'diaria') {
      dueDate.setDate(currentDate.getDate() + i);
    } else if (loan.frequency === 'semanal') {
      dueDate.setDate(currentDate.getDate() + (i * 7));
    } else if (loan.frequency === 'mensual') {
      dueDate.setMonth(currentDate.getMonth() + i);
    }

    const isPast = dueDate < new Date();
    const isPaid = loan.status === 'completado' || (isPast && Math.random() > 0.3);

    payments.push({
      id: `${loan.id}-${i + 1}`,
      loanId: loan.id,
      amount: installmentAmount,
      dueDate,
      paidDate: isPaid ? new Date(dueDate.getTime() - Math.random() * 86400000) : undefined,
      status: isPaid ? 'pagada' : (isPast ? 'vencida' : 'pendiente'),
    });
  }

  return payments;
};

const initialActivityLogs: ActivityLog[] = [];

const initialPayments: Payment[] = initialLoans.flatMap(loan => generatePayments(loan));
interface DashboardProps {
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  activityLogs?: ActivityLog[];
}


export function Dashboard() {

     const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);

     const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setActivityLogs([newLog, ...activityLogs]);
  };
     const [clients, setClients] = useState<Client[]>(initialClients);
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  // Estadísticas generales
  const activeLoans = loans.filter(l => l.status === 'activo');
  const totalClients = clients.length;
  
  const totalCollected = payments
    .filter(p => p.status === 'pagada')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalPending = payments
    .filter(p => p.status !== 'pagada')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const overduePayments = payments.filter(p => p.status === 'vencida');
  
  // Pagos de esta semana
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  
  const weeklyPayments = payments.filter(p => {
    const dueDate = new Date(p.dueDate);
    return dueDate >= weekStart && dueDate < weekEnd;
  });
  
  const weeklyCollected = weeklyPayments
    .filter(p => p.status === 'pagada')
    .reduce((sum, p) => sum + p.amount, 0);

  // Datos para gráfico de préstamos por frecuencia
  const loansByFrequency = [
    { name: 'Diaria', value: loans.filter(l => l.frequency === 'diaria' && l.status === 'activo').length },
    { name: 'Semanal', value: loans.filter(l => l.frequency === 'semanal' && l.status === 'activo').length },
    { name: 'Mensual', value: loans.filter(l => l.frequency === 'mensual' && l.status === 'activo').length },
    { name: 'Indefinida', value: loans.filter(l => l.frequency === 'indefinida' && l.status === 'activo').length },
  ];

  // Datos para gráfico de pagos por mes (últimos 6 meses)
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
    
    const monthPayments = payments.filter(p => {
      const paymentDate = p.paidDate || p.dueDate;
      return paymentDate.getMonth() === date.getMonth() && 
             paymentDate.getFullYear() === date.getFullYear();
    });
    
    monthlyData.push({
      month: monthName,
      recaudado: monthPayments.filter(p => p.status === 'pagada').reduce((sum, p) => sum + p.amount, 0),
      esperado: monthPayments.reduce((sum, p) => sum + p.amount, 0),
    });
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Resumen general de tu negocio de préstamos</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Clientes</p>
              <p className="text-gray-900 mt-1">{totalClients}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Préstamos Activos</p>
              <p className="text-gray-900 mt-1">{activeLoans.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Cuotas Vencidas</p>
              <p className="text-gray-900 mt-1">{overduePayments.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Recaudado</p>
              <p className="text-gray-900 mt-1">{formatCurrency(totalCollected)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Por Recaudar</p>
              <p className="text-gray-900 mt-1">{formatCurrency(totalPending)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Recaudado esta Semana</p>
              <p className="text-gray-900 mt-1">{formatCurrency(weeklyCollected)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de recaudación mensual */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Recaudación Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line type="monotone" dataKey="recaudado" stroke="#10b981" strokeWidth={2} name="Recaudado" />
              <Line type="monotone" dataKey="esperado" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Esperado" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de préstamos por frecuencia */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Préstamos por Modalidad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loansByFrequency}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {loansByFrequency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Próximos pagos */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Próximos Pagos (Esta Semana)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Cliente</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Monto</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm">Estado</th>
              </tr>
            </thead>
            <tbody>
              {weeklyPayments.slice(0, 10).map(payment => {
                const loan = loans.find(l => l.id === payment.loanId);
                const client = clients.find(c => c.id === loan?.clientId);
                return (
                  <tr key={payment.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {new Date(payment.dueDate).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{client?.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                        payment.status === 'pagada'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'vencida'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status === 'pagada' ? 'Pagada' : payment.status === 'vencida' ? 'Vencida' : 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actividad de Empleados */}
      {activityLogs && activityLogs.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">Actividad Reciente del Equipo</h3>
          </div>
          <div className="space-y-3">
            {activityLogs.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm flex-shrink-0">
                  {log.employeeName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{log.employeeName}</span> {log.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(log.timestamp).toLocaleString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                  log.action === 'created_loan' ? 'bg-green-100 text-green-800' :
                  log.action === 'registered_payment' ? 'bg-blue-100 text-blue-800' :
                  log.action === 'created_client' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {log.action === 'created_loan' && 'Préstamo'}
                  {log.action === 'registered_payment' && 'Pago'}
                  {log.action === 'created_client' && 'Cliente'}
                  {log.action === 'updated_client' && 'Actualización'}
                  {log.action === 'updated_loan' && 'Actualización'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}