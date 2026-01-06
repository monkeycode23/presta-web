import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Plus, Calendar, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import type {  Payment } from '../types/general';
import { AddLoanModal } from '../components/loans/AddLoanModal';
import { initialClients, initialLoans, type Client, type Loan,type ActivityLog} from '../types/general.d';
import { useParams } from 'react-router';
import LoanCard from '../components/loans/LoanCard';
import PaymentCard from '../components/payments/PaymentCard';

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
interface ClientDetailProps {
  client: Client;
  loans: Loan[];
  payments: Payment[];
  onBack: () => void;
  onAddLoan: (loan: Omit<Loan, 'id'>) => void;
  onPaymentUpdate: (paymentId: string) => void;
}

export function ClientDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { clientId } = useParams()

  const [loans, setLoans] = useState(initialLoans);

  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(loans[0]?.id || null);

  const client:Client = initialClients.filter((c)=>c.id ==clientId)[0]

  /* { client, loans, payments, onBack, onAddLoan, onPaymentUpdate }: ClientDetailProps */
    const initialPayments: Payment[] = initialLoans.flatMap(loan => generatePayments(loan));
interface DashboardProps {
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  activityLogs?: ActivityLog[];
}

  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };


  const onAddLoan = () => {
    
  }
  const selectedLoan = loans.find(l => l.id === selectedLoanId);
  const loanPayments = selectedLoan ? payments.filter(p => p.loanId === selectedLoan.id) : [];

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

  const handleAddLoan = (loanData: Omit<Loan, 'id' | 'clientId'>) => {
   /*  onAddLoan({ ...loanData, clientId: client.id }); */
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={/* onBack */()=>{}}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-gray-900 mb-1">{client.name}</h2>
          <p className="text-gray-600">Información del cliente y sus préstamos</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Préstamo
        </button>
      </div>

      {/* Información del Cliente */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-gray-900">{client.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{client.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="text-gray-900">{client.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cliente desde</p>
              <p className="text-gray-900">{new Date(client.createdAt).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Préstamos */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Préstamos ({loans.length})</h3>
        
        {/* Carrusel horizontal de préstamos */}
        <div className=" max-h-[420px] overflow-y-auto pr-2">
          <div className="flex gap-4 p-5" style={{ minWidth: 'min-content' }}>
            {loans.map(loan => {
              const progress = getLoanProgress(loan);
              return (
                <LoanCard key={loan.id} loan={loan}></LoanCard>
               
              );
            })}
          </div>
        </div>
        
        {/* {loans.length > 1 && (
          <p className="text-sm text-gray-500 text-center mt-2">← Desliza para ver más préstamos →</p>
        )} */}
      </div>

      {/* Cronograma de Pagos */}
      {selectedLoan && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Cronograma de Pagos</h3>
           <div className='w-full grid grid-cols-12 gap-5'>
        {payments.map((payment) => (
           /*  <PaymentCard key={payment.id} payment={payment} /> */
           <div>cuota</div>
        ))}
    </div>
        </div>
      )}

      {loans.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Este cliente no tiene préstamos aún</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear Primer Préstamo
          </button>
        </div>
      )}

      <AddLoanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddLoan}
      />
    </div>
  );
}


/* 

 <div
                  key={loan.id}
                  onClick={() => setSelectedLoanId(loan.id)}
                  className={`flex-shrink-0 w-80 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedLoanId === loan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900">{formatCurrency(loan.amount)}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          loan.status === 'activo'
                            ? 'bg-green-100 text-green-800'
                            : loan.status === 'completado'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {loan.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Inicio: {new Date(loan.startDate).toLocaleDateString('es-ES')} • {loan.installments} cuotas {loan.frequency}s
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total a pagar</p>
                      <p className="text-green-600">{formatCurrency(loan.totalAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progreso: {progress.paid} / {progress.total} cuotas</span>
                      <span className="text-gray-900">{progress.percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Pagado: {formatCurrency(progress.amountPaid)}</span>
                      <span className="text-orange-600">Pendiente: {formatCurrency(progress.amountPending)}</span>
                    </div>
                  </div>
                </div>
*/


/* 
 <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Cuota</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha Vencimiento</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Monto</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Fecha Pago</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loanPayments.map((payment, index) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#{index + 1}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {new Date(payment.dueDate).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('es-ES') : '-'}
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
                    <td className="py-3 px-4">
                      {payment.status !== 'pagada' && (
                        <button
                          onClick={() =>{} /*  onPaymentUpdate(payment.id) 
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Marcar como pagada
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

*/