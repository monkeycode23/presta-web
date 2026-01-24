import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { AddLoanModal } from "./AddLoanModal";

import { useParams } from "react-router";

import { useClientStore } from "../../store/client.store";
import ClientFinacialStatus from "./ClientFinacialStatus";
import ClientStatics from "./ClientStatics";
import ClientInformation from "./ClientInformation";
import ClientLoansList from "./ClientLoansList";
import ClientLoanPayments from "./ClientLoanPayments";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import {
  GET_CLIENT,
  type GetClientResponse,
  type GetClientVars,
} from "../../graphql/client.queries";
import { useAuthStore } from "../../store/auth.store";
import {
  GET_CLIENT_LOANS,
  type GetLoansResponse,
  type GetLoansVars,
} from "../../graphql/loan.queries";
import { useLoanStore } from "../../store/loan.store";
import {
  GET_CLIENT_PAYMENTS,
  type GetPaymentsResponse,
  type GetPaymentsResponse2,
  type GetPaymentsVars,
} from "../../graphql/payments.queries";
import { usePaymentStore } from "../../store/payment.store";
import { usePaginationFilterStore } from "../../store/pagination.filter";
import { EditLoanModal } from "./EditLoanModal";
import { EditPaymentModal } from "./EditPaymentModal";
import { ViewPaymentModal } from "./ViewPaymentModal";

/* interface ClientDetailProps {
  client: Client;
  loans: Loan[];
  payments: Payment[];
  onBack: () => void;
  onAddLoan: (loan: Omit<Loan, 'id'>) => void;
  onPaymentUpdate: (paymentId: string) => void;
}
 */

export function ClientDetail() {
  const { clientId } = useParams();

  const authStore = useAuthStore();
  const { selectedClient: client, selectClient } = useClientStore();

  const { setLoans, loans, setCurrentLoan } = useLoanStore();
  const {
    setFilters,
    pagination,
    filters,
    resetFilters,
    setPage,
    setTotalPages,
    setTotal,
    setPagination,
  } = usePaginationFilterStore();

  
  const { setPayments } = usePaymentStore();

  //client info
  const [_user, { data, loading, error }] = useLazyQuery<
    GetClientResponse,
    GetClientVars
  >(GET_CLIENT, {
    fetchPolicy: "network-only", // 🔥
  });

  //loans
  const [getLoans, { data: _data, loading: _loading, error: _error }] =
    useLazyQuery<GetLoansResponse, GetLoansVars>(GET_CLIENT_LOANS, {
      fetchPolicy: "network-only", // 🔥
    });

  //client payments
  const [getPayments, { data: data_p, loading: loading_p, error: error_p }] =
    useLazyQuery<GetPaymentsResponse2, GetPaymentsVars>(GET_CLIENT_PAYMENTS, {
      fetchPolicy: "network-only", // 🔥
    });

  useEffect(() => {
    setCurrentLoan(null);
    resetFilters("loans");
    resetFilters("payments");

    setFilters(
      {
        order: "newest",
        status: [],
        disbursementDate: {
          from: "",
          to: "",
        },
        amount: {
          from: 0,
          to: 0,
        },
        installments: {
          from: 0,
          to: 0,
        },
      },
      "loans"
    );

    setFilters(
      {
        loanId: "",
        order: "newest",
        status: [],
      },
      "payments"
    );

    return () => {};
  }, []);

  useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await _user({
        variables: {
          clientId: clientId!,
        },
      });

      if (data) {
        const client = data.getClient;
        selectClient(client ?? null);
      }
    };

    fetch();

    return () => {};
  }, [authStore.user, data]);

  /** get loans */
  useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await getLoans({
        variables: {
          clientId: clientId!,
          filter: filters.loans,
        },
      });

      if (_data) {
        const loans = _data.getClientLoans;
        console.log(loans, "asdajsbdakjsdbas");
        setLoans(loans.data ?? null);
      }
    };

    fetch();

    return () => {};
  }, [authStore.user, _data, filters.loans, pagination?.loans]);

  useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await getPayments({
        variables: {
          clientId: clientId!,
          filter: filters.payments,
          pagination: {
            page: pagination.payments.page ?? 1,
            limit: pagination.payments.pageSize ?? 5,
          },
        },
      });

      if (data_p) {
        const loans = data_p.getClientPayments;

        setPayments(loans.data ?? null);
        /* 
        setTotalPages(loans.pagination.totalPages,"payments")
        setTotal(loans.pagination.total,"payments") */

        console.log(loans)
        setPagination(
          {
            totalPages: loans.pagination.totalPages,
            total: loans.pagination.total,
            pageSize: loans.pagination.limit,
          },
          "payments"
        );
      }
    };

    fetch();

    return () => {};
  }, [authStore.user, data_p, filters.payments, pagination.payments?.page]);

  if (!client) return;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          title="button"
          onClick={/* onBack */ () => {}}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-gray-900 mb-1">{client.name}</h2>
          <p className="text-gray-600">
            Información del cliente y sus préstamos
          </p>
        </div>

        {loans.length != 0 && <AddLoanModal />}
      </div>

      {/* Información del Cliente */}
      {/* <ClientInformation client={client}></ClientInformation> */}

      {loans.length ? (
        <>
          {/* Estadísticas del Cliente */}
          <ClientStatics></ClientStatics>
          {/* Detalles Financieros */}

          <ClientFinacialStatus></ClientFinacialStatus>
        </>
      ) : (
        <></>
      )}

      {/* Lista de Préstamos */}

      <ClientLoansList></ClientLoansList>
      {/* Cronograma de Pagos */}
      <ClientLoanPayments></ClientLoanPayments>

      <EditLoanModal></EditLoanModal>

      <EditPaymentModal></EditPaymentModal>

      <ViewPaymentModal></ViewPaymentModal>
    </div>
  );
}

{
  /*
   */
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
