import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, User, DollarSign } from 'lucide-react';

import { initialClients, initialLoans, type Client, type Loan,type Payment} from '../types/general.d';
interface PaymentsCalendarProps {
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  onPaymentUpdate: (paymentId: string) => void;
}

export function PaymentsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
const [clients, setClients] = useState(initialClients);
const [loans, setLoans] = useState(initialLoans);
const [payments, setPayments] = useState([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
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

  const getPaymentStatusForDate = (date: Date) => {
    const datePayments = getPaymentsForDate(date);
    if (datePayments.length === 0) return null;
    
    const hasPaid = datePayments.some(p => p.status === 'pagada');
    const hasOverdue = datePayments.some(p => p.status === 'vencida');
    const hasPending = datePayments.some(p => p.status === 'pendiente');
    
    if (hasOverdue) return 'vencida';
    if (hasPending) return 'pendiente';
    if (hasPaid) return 'pagada';
    return null;
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const selectedDatePayments = getPaymentsForDate(selectedDate);

  const selectedDateStats = {
    total: selectedDatePayments.length,
    pagadas: selectedDatePayments.filter(p => p.status === 'pagada').length,
    vencidas: selectedDatePayments.filter(p => p.status === 'vencida').length,
    pendientes: selectedDatePayments.filter(p => p.status === 'pendiente').length,
    totalAmount: selectedDatePayments.reduce((sum, p) => sum + p.amount, 0),
    collectedAmount: selectedDatePayments.filter(p => p.status === 'pagada').reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Calendario de Pagos</h2>
        <p className="text-gray-600">Visualiza y gestiona los pagos por fecha</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de pagos del día - IZQUIERDA */}
        <div className="lg:col-span-2 space-y-4">
          {/* Resumen del día */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">
              {selectedDate.toLocaleDateString('es-ES', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Total Pagos</p>
                <p className="text-gray-900">{selectedDateStats.total}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Pagadas</p>
                <p className="text-green-600">{selectedDateStats.pagadas}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Pendientes</p>
                <p className="text-yellow-600">{selectedDateStats.pendientes}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Vencidas</p>
                <p className="text-red-600">{selectedDateStats.vencidas}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monto Total</span>
                <span className="text-gray-900">{formatCurrency(selectedDateStats.totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Recaudado</span>
                <span className="text-green-600">{formatCurrency(selectedDateStats.collectedAmount)}</span>
              </div>
            </div>
          </div>

          {/* Pagos del día */}
          {selectedDatePayments.length > 0 ? (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">
                Pagos del día ({selectedDatePayments.length})
              </h3>
              <div className="space-y-3">
                {selectedDatePayments.map(payment => {
                  const loan = loans.find(l => l.id === payment.loanId);
                  const client = clients.find(c => c.id === loan?.clientId);
                  
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-lg ${
                          payment.status === 'pagada'
                            ? 'bg-green-100'
                            : payment.status === 'vencida'
                            ? 'bg-red-100'
                            : 'bg-yellow-100'
                        }`}>
                          {payment.status === 'pagada' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {payment.status === 'vencida' && <XCircle className="w-5 h-5 text-red-600" />}
                          {payment.status === 'pendiente' && <Clock className="w-5 h-5 text-yellow-600" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{client?.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Préstamo: {formatCurrency(loan?.amount || 0)}</span>
                            <span>•</span>
                            <span className="capitalize">{loan?.frequency}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{formatCurrency(payment.amount)}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                            payment.status === 'pagada'
                              ? 'bg-green-100 text-green-800'
                              : payment.status === 'vencida'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status === 'pagada' ? 'Pagada' : payment.status === 'vencida' ? 'Vencida' : 'Pendiente'}
                          </span>
                        </div>
                      </div>

                      {payment.status !== 'pagada' && (
                        <button
                          onClick={() => onPaymentUpdate(payment.id)}
                          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Marcar Pagada
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay pagos programados para esta fecha</p>
            </div>
          )}
        </div>

        {/* Calendario - DERECHA */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">{monthNames[month]} {year}</h3>
              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-1">
              {/* Días vacíos antes del primer día */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Días del mes */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const date = new Date(year, month, day);
                const isSelected = isSameDay(date, selectedDate);
                const isToday = isSameDay(date, new Date());
                const hasPayments = hasPaymentsOnDate(date);
                const paymentStatus = getPaymentStatusForDate(date);

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square p-1 rounded-lg transition-all relative text-sm ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isToday
                        ? 'bg-blue-100 text-blue-600'
                        : hasPayments
                        ? 'bg-gray-100 hover:bg-gray-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span>{day}</span>
                    {hasPayments && !isSelected && (
                      <div className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        paymentStatus === 'vencida'
                          ? 'bg-red-500'
                          : paymentStatus === 'pendiente'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Leyenda */}
            <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-600">Pagadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs text-gray-600">Pendientes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-gray-600">Vencidas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}