import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  User,
  DollarSign,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import { formatCurrency } from "../../common/funcs";
import { usePaymentStore } from "../../store/payment.store";
import PaymentFilterDropdown from "./FilterPayments";
import { usePaginationFilterStore } from "../../store/pagination.filter";
import Pagination from "../../components/Pagination";
import Dropdown from "../../components/Dropdowns/Dropdown";
import PayPaymentModal from "../ClientDetail/PayPaymentModal";

export function PaymentsList() {
  const { payments, paymentsStatus } = usePaymentStore();

  const { filters, pagination, setPage } = usePaginationFilterStore();

  const paymentStatusDate = paymentsStatus.find((p) => {
    const currentDate = filters.payments_date.payment_date.exact;

    console.log(currentDate);
    return currentDate == p._id;
  });

  console.log(paymentStatusDate);

  return (
    <>
      {/* Pagos del día */}
      {paymentStatusDate?.total ? (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between text-md ">
            <div className="w-full">
              <div className=" flex justify-between  text-gray-900 mb-4 text-md font-normal">
                <span> Pagos del día ({payments.length})</span>

                <div>
                  {pagination.payments_date.total >
                    pagination.payments_date.pageSize && (
                    <Pagination
                      name={"payments_date"}
                      currentPage={pagination.payment_date?.page}
                      totalPages={pagination.payment_date?.totalPages}
                      changePage={(page: number) =>
                        setPage(page, "payments_date")
                      }
                    ></Pagination>
                  )}
                </div>
              </div>
              <PaymentFilterDropdown></PaymentFilterDropdown>
            </div>
          </div>
          <div className="space-y-3">
            {!payments.length && (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No se encontraron pagos programados
                </p>
              </div>
            )}

            {payments.map((payment: any) => {
              const loan = payment.loan;
              const client = payment.client;

              return (
                <div
                  key={payment._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        payment.status === "paid"
                          ? "bg-green-100"
                          : payment.status === "expired"
                          ? "bg-red-100"
                          : payment.status === "pending"
                          ? "bg-blue-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      {payment.status === "paid" && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {payment.status === "expired" && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      {payment.status === "pending" && (
                        <Clock className="w-5 h-5 text-blue-600" />
                      )}
                      {payment.status === "incomplete" && (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{client.nickname}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          Préstamo: {formatCurrency(loan?.amount || 0)}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{payment.label}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">
                          {formatCurrency(payment.amount)}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "expired"
                            ? "bg-red-100 text-red-800"
                            : payment.status === "pending"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status === "paid"
                          ? "Pagada"
                          : payment.status === "vencida"
                          ? "Vencida"
                          : payment.status === "pending"
                          ? "Pendiente"
                          : "Incompleta"}
                      </span>
                    </div>
                  </div>

                  <Dropdown right top={30}>
                    <div className="flex  gap-2 p-2">
                      {payment.status !== "paid" && (
                        <PayPaymentModal payment={payment} />
                      )}
                      <button className="text-sm hover:text-yellow-600 flex gap-1">
                        editar <Pencil width={14} />
                      </button>
                      <button className="text-sm hover:text-red-600 flex gap-1">
                        eliminar <Trash2 width={14} />
                      </button>
                      <button className="text-sm hover:text-gray-600 flex gap-1">
                        ver <Eye width={14} />
                      </button>
                    </div>
                  </Dropdown>
                  {/*   {payment.status !== "paid" && (
                    <button
                      onClick={() => {
                        /* onPaymentUpdate(payment.id) 
                      }}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Marcar Pagada
                    </button>
                  )} */}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            No hay pagos programados para esta fecha
          </p>
        </div>
      )}
    </>
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
