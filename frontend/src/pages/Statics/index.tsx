import React, { useState } from 'react';
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp, Filter, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Client, Loan, Payment } from '../../types/general'

interface ReportsProps {
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
}

type ReportType = 'clients' | 'payments' | 'loans' | 'overdue';

export function Reports() {
  const [reportType, setReportType] = useState<ReportType>('clients');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const clients:any = []
  const loans:any = []
  const payments:any = []
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES');
  };

  // Filtrar datos según fechas y cliente
  const filterByDateAndClient = <T extends { clientId?: string }>(
    items: T[],
    dateField: keyof T
  ): T[] => {
    return items.filter(item => {
      const itemDate = new Date(item[dateField] as Date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const dateMatch = (!start || itemDate >= start) && (!end || itemDate <= end);
      const clientMatch = selectedClient === 'all' || item.clientId === selectedClient;

      return dateMatch && clientMatch;
    });
  };

  // Generar reporte de clientes
  const generateClientReport = () => {
    const filteredClients = clients.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredClients.map(client => {
      const clientLoans = loans.filter(l => l.clientId === client.id);
      const clientPayments = payments.filter(p => {
        const loan = loans.find(l => l.id === p.loanId);
        return loan?.clientId === client.id;
      });

      const totalBorrowed = clientLoans.reduce((sum, l) => sum + l.amount, 0);
      const totalToPay = clientLoans.reduce((sum, l) => sum + l.totalAmount, 0);
      const totalPaid = clientPayments.filter(p => p.status === 'pagada').reduce((sum, p) => sum + p.amount, 0);
      const totalPending = clientPayments.filter(p => p.status !== 'pagada').reduce((sum, p) => sum + p.amount, 0);
      const overdueCount = clientPayments.filter(p => p.status === 'vencida').length;

      return {
        ...client,
        totalBorrowed,
        totalToPay,
        totalPaid,
        totalPending,
        activeLoans: clientLoans.filter(l => l.status === 'activo').length,
        overdueCount,
      };
    });
  };

  // Generar reporte de pagos
  const generatePaymentReport = () => {
    const filteredPayments = filterByDateAndClient(
      payments.map(p => {
        const loan = loans.find(l => l.id === p.loanId);
        return { ...p, clientId: loan?.clientId };
      }),
      'dueDate'
    );

    return filteredPayments.map(payment => {
      const loan = loans.find(l => l.id === payment.loanId);
      const client = clients.find(c => c.id === loan?.clientId);
      return {
        ...payment,
        client,
        loan,
      };
    });
  };

  // Generar reporte de préstamos
  const generateLoanReport = () => {
    const filteredLoans = filterByDateAndClient(loans, 'startDate');

    return filteredLoans.map(loan => {
      const client = clients.find(c => c.id === loan.clientId);
      const loanPayments = payments.filter(p => p.loanId === loan.id);
      const paidPayments = loanPayments.filter(p => p.status === 'pagada');

      return {
        ...loan,
        client,
        totalPayments: loanPayments.length,
        paidPayments: paidPayments.length,
        progress: (paidPayments.length / loanPayments.length) * 100,
      };
    });
  };

  // Generar reporte de pagos vencidos
  const generateOverdueReport = () => {
    const overduePayments = payments.filter(p => p.status === 'vencida');

    return overduePayments.map(payment => {
      const loan = loans.find(l => l.id === payment.loanId);
      const client = clients.find(c => c.id === loan?.clientId);
      const daysOverdue = Math.floor(
        (new Date().getTime() - new Date(payment.dueDate).getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        ...payment,
        client,
        loan,
        daysOverdue,
      };
    });
  };

  // Exportar a CSV
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          if (value instanceof Date) return formatDate(value);
          if (typeof value === 'object') return JSON.stringify(value);
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const clientReport = generateClientReport();
  const paymentReport = generatePaymentReport();
  const loanReport = generateLoanReport();
  const overdueReport = generateOverdueReport();

  // Estadísticas generales
  const totalClients = clients.length;
  const totalLoansAmount = loans.reduce((sum, l) => sum + l.amount, 0);
  const totalCollected = payments.filter(p => p.status === 'pagada').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status !== 'pagada').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Reportes y Análisis</h2>
        <p className="text-gray-600">Genera reportes detallados sobre tu negocio</p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <p className="text-gray-600 text-sm">Total Prestado</p>
              <p className="text-gray-900 mt-1">{formatCurrency(totalLoansAmount)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
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
              <p className="text-gray-600 text-sm">Total Pendiente</p>
              <p className="text-gray-900 mt-1">{formatCurrency(totalPending)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Filtros</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Tipo de Reporte</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="clients">Clientes</option>
              <option value="payments">Pagos</option>
              <option value="loans">Préstamos</option>
              <option value="overdue">Pagos Vencidos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Fecha Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Cliente</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los clientes</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
        </div>

        {reportType === 'clients' && (
          <div className="mt-4">
            <label className="block text-sm text-gray-700 mb-1">Buscar Cliente</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Reporte de Clientes */}
      {reportType === 'clients' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Reporte de Clientes ({clientReport.length})</h3>
            <button
              onClick={() => exportToCSV(clientReport, 'reporte_clientes')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Contacto</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Préstamos Activos</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Total Prestado</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Total Pagado</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Total Pendiente</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Pagos Vencidos</th>
                </tr>
              </thead>
              <tbody>
                {clientReport.map(client => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">Desde {formatDate(client.createdAt)}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-900">{client.phone}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{client.activeLoans}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(client.totalBorrowed)}</td>
                    <td className="py-3 px-4 text-green-600">{formatCurrency(client.totalPaid)}</td>
                    <td className="py-3 px-4 text-orange-600">{formatCurrency(client.totalPending)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.overdueCount > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {client.overdueCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reporte de Pagos */}
      {reportType === 'payments' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Reporte de Pagos ({paymentReport.length})</h3>
            <button
              onClick={() => exportToCSV(paymentReport, 'reporte_pagos')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha Vencimiento</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Monto</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha Pago</th>
                </tr>
              </thead>
              <tbody>
                {paymentReport.map(payment => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{formatDate(payment.dueDate)}</td>
                    <td className="py-3 px-4 text-gray-900">{payment.client?.name}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs ${
                        payment.status === 'pagada' ? 'bg-green-100 text-green-800' :
                        payment.status === 'vencida' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status === 'pagada' && <CheckCircle className="w-3 h-3" />}
                        {payment.status === 'vencida' && <XCircle className="w-3 h-3" />}
                        {payment.status === 'pendiente' && <Clock className="w-3 h-3" />}
                        {payment.status === 'pagada' ? 'Pagada' : payment.status === 'vencida' ? 'Vencida' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {payment.paidDate ? formatDate(payment.paidDate) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reporte de Préstamos */}
      {reportType === 'loans' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Reporte de Préstamos ({loanReport.length})</h3>
            <button
              onClick={() => exportToCSV(loanReport, 'reporte_prestamos')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Monto</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Total a Pagar</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Modalidad</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Progreso</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Estado</th>
                </tr>
              </thead>
              <tbody>
                {loanReport.map(loan => (
                  <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{formatDate(loan.startDate)}</td>
                    <td className="py-3 px-4 text-gray-900">{loan.client?.name}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(loan.amount)}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(loan.totalAmount)}</td>
                    <td className="py-3 px-4 text-gray-900 capitalize">{loan.frequency}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${loan.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{loan.progress.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        loan.status === 'activo' ? 'bg-green-100 text-green-800' :
                        loan.status === 'completado' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reporte de Pagos Vencidos */}
      {reportType === 'overdue' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Reporte de Pagos Vencidos ({overdueReport.length})</h3>
            <button
              onClick={() => exportToCSV(overdueReport, 'reporte_vencidos')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Monto</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha Vencimiento</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Días Vencido</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Préstamo Original</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Contacto</th>
                </tr>
              </thead>
              <tbody>
                {overdueReport.map(payment => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{payment.client?.name}</td>
                    <td className="py-3 px-4 text-red-600">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-4 text-gray-900">{formatDate(payment.dueDate)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        {payment.daysOverdue} días
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(payment.loan?.amount || 0)}</td>
                    <td className="py-3 px-4 text-gray-900">{payment.client?.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
