import React, { useState } from 'react';
import { Lock, Calendar, Users, TrendingUp, DollarSign, Plus, Search, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight, MessageSquare, Send } from 'lucide-react';
import { Employee, Client, Loan, Payment, ChatMessage } from '../App';
import { AddClientModal } from './AddClientModal';
import { AddLoanModal } from './AddLoanModal';

interface EmployeePortalProps {
  employees: Employee[];
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  onAddClient: (client: Omit<Client, 'id' | 'createdAt'>, employeeId: string) => void;
  onAddLoan: (loan: Omit<Loan, 'id'>, employeeId: string) => void;
  onPaymentUpdate: (paymentId: string, employeeId: string) => void;
  onSendMessage: (employeeId: string, message: string) => void;
  chatMessages: ChatMessage[];
}

export function EmployeePortal({
  employees,
  clients,
  loans,
  payments,
  onAddClient,
  onAddLoan,
  onPaymentUpdate,
  onSendMessage,
  chatMessages,
}: EmployeePortalProps) {
  const [pin, setPin] = useState('');
  const [loggedInEmployee, setLoggedInEmployee] = useState<Employee | null>(null);
  const [view, setView] = useState<'dashboard' | 'calendar' | 'clients' | 'chat'>('dashboard');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = employees.find(e => e.accessPin === pin);
    if (employee) {
      setLoggedInEmployee(employee);
      setPin('');
    } else {
      alert('PIN incorrecto. Inténtalo de nuevo.');
      setPin('');
    }
  };

  const handleLogout = () => {
    setLoggedInEmployee(null);
    setView('dashboard');
  };

  if (!loggedInEmployee) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 border border-gray-200 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Portal del Empleado</h2>
            <p className="text-gray-600">Ingresa tu PIN de 4 dígitos para acceder</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••"
              />
            </div>
            <button
              type="submit"
              disabled={pin.length !== 4}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              PINs de ejemplo: 1111, 2222, 3333
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header del empleado */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2">Bienvenido, {loggedInEmployee.name}</h2>
            <p className="text-purple-100">{loggedInEmployee.position}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Alerta de permisos */}
      {(!loggedInEmployee.permissions?.canCreateClients && 
        !loggedInEmployee.permissions?.canCreateLoans && 
        !loggedInEmployee.permissions?.canRegisterPayments) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ Tu cuenta no tiene permisos asignados. Contacta al administrador para obtener acceso.
          </p>
        </div>
      )}

      {/* Navegación */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            view === 'dashboard'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          Dashboard
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            view === 'calendar'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Calendario de Pagos
        </button>
        <button
          onClick={() => setView('clients')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            view === 'clients'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Users className="w-5 h-5" />
          Gestión de Clientes
        </button>
        <button
          onClick={() => setView('chat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            view === 'chat'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          Chat
        </button>
      </div>

      {/* Contenido */}
      {view === 'dashboard' && (
        <EmployeeDashboard
          clients={clients}
          loans={loans}
          payments={payments}
          employeeId={loggedInEmployee.id}
        />
      )}
      {view === 'calendar' && (
        <EmployeeCalendar
          clients={clients}
          loans={loans}
          payments={payments}
          employeeId={loggedInEmployee.id}
          onPaymentUpdate={onPaymentUpdate}
        />
      )}
      {view === 'clients' && (
        <EmployeeClients
          clients={clients}
          loans={loans}
          employeeId={loggedInEmployee.id}
          onAddClient={onAddClient}
          onAddLoan={onAddLoan}
        />
      )}
      {view === 'chat' && (
        <EmployeeChatView
          employees={employees}
          messages={chatMessages}
          currentEmployeeId={loggedInEmployee.id}
          onSendMessage={onSendMessage}
        />
      )}
    </div>
  );
}

// Dashboard del empleado
function EmployeeDashboard({ clients, loans, payments }: {
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  employeeId: string;
}) {
  const activeLoans = loans.filter(l => l.status === 'activo');
  const totalCollected = payments.filter(p => p.status === 'pagada').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status !== 'pagada').reduce((sum, p) => sum + p.amount, 0);
  const overduePayments = payments.filter(p => p.status === 'vencida');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-gray-900">Resumen General</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Clientes</p>
              <p className="text-gray-900 mt-1">{clients.length}</p>
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
              <p className="text-gray-600 text-sm">Pagos Vencidos</p>
              <p className="text-gray-900 mt-1">{overduePayments.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Pagos próximos */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Pagos Próximos (Esta Semana)</h3>
        <div className="space-y-3">
          {payments
            .filter(p => {
              const dueDate = new Date(p.dueDate);
              const today = new Date();
              const weekLater = new Date();
              weekLater.setDate(today.getDate() + 7);
              return dueDate >= today && dueDate <= weekLater;
            })
            .slice(0, 5)
            .map(payment => {
              const loan = loans.find(l => l.id === payment.loanId);
              const client = clients.find(c => c.id === loan?.clientId);
              return (
                <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      payment.status === 'pagada' ? 'bg-green-100' :
                      payment.status === 'vencida' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      {payment.status === 'pagada' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {payment.status === 'vencida' && <XCircle className="w-4 h-4 text-red-600" />}
                      {payment.status === 'pendiente' && <Clock className="w-4 h-4 text-yellow-600" />}
                    </div>
                    <div>
                      <p className="text-gray-900">{client?.name}</p>
                      <p className="text-sm text-gray-600">{new Date(payment.dueDate).toLocaleDateString('es-ES')}</p>
                    </div>
                  </div>
                  <p className="text-gray-900">{formatCurrency(payment.amount)}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// Calendario de pagos para empleados
function EmployeeCalendar({
  clients,
  loans,
  payments,
  employeeId,
  onPaymentUpdate,
}: {
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  employeeId: string;
  onPaymentUpdate: (paymentId: string, employeeId: string) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getPaymentsForDate = (date: Date) => {
    return payments.filter(payment => isSameDay(new Date(payment.dueDate), date));
  };

  const hasPaymentsOnDate = (date: Date) => {
    return getPaymentsForDate(date).length > 0;
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const selectedDatePayments = getPaymentsForDate(selectedDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de pagos */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">
          Pagos del {selectedDate.toLocaleDateString('es-ES')} ({selectedDatePayments.length})
        </h3>
        {selectedDatePayments.length > 0 ? (
          <div className="space-y-3">
            {selectedDatePayments.map(payment => {
              const loan = loans.find(l => l.id === payment.loanId);
              const client = clients.find(c => c.id === loan?.clientId);
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${
                      payment.status === 'pagada' ? 'bg-green-100' :
                      payment.status === 'vencida' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      {payment.status === 'pagada' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {payment.status === 'vencida' && <XCircle className="w-5 h-5 text-red-600" />}
                      {payment.status === 'pendiente' && <Clock className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{client?.name}</p>
                      <p className="text-sm text-gray-600">
                        Préstamo: {formatCurrency(loan?.amount || 0)} • {loan?.frequency}
                      </p>
                    </div>
                    <p className="text-gray-900">{formatCurrency(payment.amount)}</p>
                  </div>
                  {payment.status !== 'pagada' && (
                    <button
                      onClick={() => onPaymentUpdate(payment.id, employeeId)}
                      className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      Registrar Pago
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No hay pagos programados para esta fecha</p>
        )}
      </div>

      {/* Calendario */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">{monthNames[month]} {year}</h3>
          <div className="flex gap-2">
            <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs text-gray-500 py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(year, month, day);
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            const hasPayments = hasPaymentsOnDate(date);

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square p-1 rounded-lg transition-all relative text-sm ${
                  isSelected ? 'bg-purple-600 text-white' :
                  isToday ? 'bg-purple-100 text-purple-600' :
                  hasPayments ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50'
                }`}
              >
                <span>{day}</span>
                {hasPayments && !isSelected && (
                  <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-purple-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Gestión de clientes para empleados
function EmployeeClients({
  clients,
  loans,
  employeeId,
  onAddClient,
  onAddLoan,
}: {
  clients: Client[];
  loans: Loan[];
  employeeId: string;
  onAddClient: (client: Omit<Client, 'id' | 'createdAt'>, employeeId: string) => void;
  onAddLoan: (loan: Omit<Loan, 'id'>, employeeId: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleAddClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    onAddClient(client, employeeId);
    setIsClientModalOpen(false);
  };

  const handleAddLoan = (loan: Omit<Loan, 'id' | 'clientId'>) => {
    if (selectedClientId) {
      onAddLoan({ ...loan, clientId: selectedClientId }, employeeId);
      setIsLoanModalOpen(false);
      setSelectedClientId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={() => setIsClientModalOpen(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => {
          const clientLoans = loans.filter(l => l.clientId === client.id && l.status === 'activo');
          return (
            <div key={client.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="mb-3">
                <h4 className="text-gray-900">{client.name}</h4>
                <p className="text-sm text-gray-600">{client.phone}</p>
              </div>
              <div className="mb-3 pb-3 border-b border-gray-200">
                <p className="text-xs text-gray-500">Préstamos activos</p>
                <p className="text-gray-900">{clientLoans.length}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedClientId(client.id);
                  setIsLoanModalOpen(true);
                }}
                className="w-full px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
              >
                Otorgar Préstamo
              </button>
            </div>
          );
        })}
      </div>

      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onAdd={handleAddClient}
      />

      <AddLoanModal
        isOpen={isLoanModalOpen}
        onClose={() => {
          setIsLoanModalOpen(false);
          setSelectedClientId(null);
        }}
        onAdd={handleAddLoan}
      />
    </div>
  );
}

// Vista de chat para empleados
function EmployeeChatView({
  employees,
  messages,
  currentEmployeeId,
  onSendMessage,
}: {
  employees: Employee[];
  messages: ChatMessage[];
  currentEmployeeId: string;
  onSendMessage: (employeeId: string, message: string) => void;
}) {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(currentEmployeeId, messageText);
      setMessageText('');
    }
  };

  const sortedMessages = [...messages].sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const getEmployeeName = (employeeId: string) => {
    return employees.find(e => e.id === employeeId)?.name || 'Desconocido';
  };

  const getEmployeeInitials = (employeeId: string) => {
    const name = getEmployeeName(employeeId);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200" style={{ height: 'calc(100vh - 350px)' }}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-gray-900">Chat Grupal del Equipo</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {sortedMessages.map((message) => {
            const isCurrentUser = message.employeeId === currentEmployeeId;
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                  {getEmployeeInitials(message.employeeId)}
                </div>
                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-md`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-600">{getEmployeeName(message.employeeId)}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isCurrentUser ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={!messageText.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}