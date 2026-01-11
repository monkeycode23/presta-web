import React, { useState } from 'react';
import { Lock, Bell, TrendingUp, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Client, Loan, Payment, Notification } from '../App';
import { NotificationBell } from './NotificationBell';

interface ClientPortalProps {
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  notifications: Notification[];
}

export function ClientPortal({ clients, loans, payments, notifications }: ClientPortalProps) {
  const [pin, setPin] = useState('');
  const [loggedInClient, setLoggedInClient] = useState<Client | null>(null);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.accessPin === pin);
    if (client) {
      setLoggedInClient(client);
      setPin('');
    } else {
      alert('PIN incorrecto. Inténtalo de nuevo.');
      setPin('');
    }
  };

  const handleLogout = () => {
    setLoggedInClient(null);
  };

  if (!loggedInClient) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 border border-gray-200 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Portal del Cliente</h2>
            <p className="text-gray-600">Ingresa tu PIN de 4 dígitos para acceder</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••"
              />
            </div>
            <button
              type="submit"
              disabled={pin.length !== 4}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              PINs de ejemplo: 1234, 5678, 9012, 3456
            </p>
          </div>
        </div>
      </div>
    );
  }

  const clientLoans = loans.filter(l => l.clientId === loggedInClient.id);
  const clientNotifications = notifications.filter(n => n.clientId === loggedInClient.id);

  return (
    <div className="space-y-6">
      {/* Header del cliente */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2">Bienvenido, {loggedInClient.name}</h2>
            <p className="text-blue-100">Panel de Control Personal</p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell notifications={clientNotifications} />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Mis Préstamos */}
      <div>
        <h3 className="text-gray-900 mb-4">Mis Préstamos</h3>
        <ClientLoansCarousel loans={clientLoans} payments={payments} />
      </div>

      {/* Mis Pagos */}
      <div>
        <h3 className="text-gray-900 mb-4">Cronograma de Pagos</h3>
        <ClientPaymentsTable loans={clientLoans} payments={payments} />
      </div>
    </div>
  );
}

// Carrusel de préstamos
function ClientLoansCarousel({ loans, payments }: { loans: Loan[]; payments: Payment[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loans.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
        <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No tienes préstamos activos</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getLoanProgress = (loan: Loan) => {
    const loanPayments = payments.filter(p => p.loanId === loan.id);
    const paidPayments = loanPayments.filter(p => p.status === 'pagada');
    return {
      total: loanPayments.length,
      paid: paidPayments.length,
      percentage: (paidPayments.length / loanPayments.length) * 100,
      amountPaid: paidPayments.reduce((sum, p) => sum + p.amount, 0),
      amountPending: loanPayments.filter(p => p.status !== 'pagada').reduce((sum, p) => sum + p.amount, 0),
    };
  };

  const nextLoan = () => {
    setCurrentIndex((prev) => (prev + 1) % loans.length);
  };

  const prevLoan = () => {
    setCurrentIndex((prev) => (prev - 1 + loans.length) % loans.length);
  };

  // Calcular qué préstamos mostrar (3 a la vez en desktop, 1 en mobile)
  const visibleLoans = [
    loans[currentIndex],
    loans[(currentIndex + 1) % loans.length],
    loans[(currentIndex + 2) % loans.length],
  ].filter(Boolean);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex gap-4">
          {visibleLoans.map((loan) => {
            const progress = getLoanProgress(loan);
            return (
              <div
                key={loan.id}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-12px)] bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Monto del Préstamo</p>
                    <p className="text-gray-900">{formatCurrency(loan.amount)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    loan.status === 'activo'
                      ? 'bg-green-100 text-green-800'
                      : loan.status === 'completado'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {loan.status === 'activo' ? 'Activo' : loan.status === 'completado' ? 'Completado' : 'Vencido'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Modalidad:</span>
                    <span className="text-gray-900 capitalize">{loan.frequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total a Pagar:</span>
                    <span className="text-green-600">{formatCurrency(loan.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cuotas:</span>
                    <span className="text-gray-900">{progress.paid} / {progress.total}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progreso</span>
                    <span className="text-gray-900">{progress.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Pagado</p>
                    <p className="text-sm text-green-600">{formatCurrency(progress.amountPaid)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Pendiente</p>
                    <p className="text-sm text-orange-600">{formatCurrency(progress.amountPending)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {loans.length > 3 && (
        <>
          <button
            onClick={prevLoan}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextLoan}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}
    </div>
  );
}

// Tabla de pagos
function ClientPaymentsTable({ loans, payments }: { loans: Loan[]; payments: Payment[] }) {
  const allPayments = loans.flatMap(loan => 
    payments.filter(p => p.loanId === loan.id).map(p => ({ ...p, loan }))
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha Vencimiento</th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm">Préstamo</th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm">Monto</th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm">Estado</th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha Pago</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">
                  {new Date(payment.dueDate).toLocaleDateString('es-ES')}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {formatCurrency(payment.loan.amount)} - {payment.loan.frequency}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs ${
                    payment.status === 'pagada'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'vencida'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status === 'pagada' && <CheckCircle className="w-3 h-3" />}
                    {payment.status === 'vencida' && <XCircle className="w-3 h-3" />}
                    {payment.status === 'pendiente' && <Clock className="w-3 h-3" />}
                    {payment.status === 'pagada' ? 'Pagada' : payment.status === 'vencida' ? 'Vencida' : 'Pendiente'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('es-ES') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
