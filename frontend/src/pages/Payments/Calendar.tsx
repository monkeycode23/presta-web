import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  User,
  DollarSign,
} from "lucide-react";
import { usePaymentStore } from "../../store/payment.store";
import { usePaginationFilterStore } from "../../store/pagination.filter";
import {
  GET_PAYMENTS_STATUS,
  GET_PAYMENTS_STATUS2,
  type GetPaymentsResponse,
  type GetPaymentsStatusResponse,
  type GetPaymentsStatusVars,
  type GetPaymentsVars2,
} from "../../graphql/payments.queries";
import { useLazyQuery } from "@apollo/client/react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [payment_date, setPaymentDate] = useState({
    to: "",
    from: "",
    exact: "",
  });

    const { payments,paymentsStatus,setPaymentsStatus } = usePaymentStore();

  
  const { updateFilterValue, filters } = usePaginationFilterStore();

  const [getPayments, { data, loading, error }] = useLazyQuery<
    GetPaymentsStatusResponse,
    GetPaymentsStatusVars  >(GET_PAYMENTS_STATUS2, {
    fetchPolicy: "network-only", // 🔥
  });

  useEffect(() => {
    const fetch = async () => {
      console.log(filters);


        const primerDia = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() ,
      1
    );
    const ultimoDia = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

      const response: any = await getPayments({
        variables: {
          filter: {
            payment_date/*  {
              from: primerDia.toISOString().split("T")[0],
              to: ultimoDia.toISOString().split("T")[0],
              exact: "",
            }, */
          },
        },
      });

      if (data) {
        const payments = data.paymentsStatus;

        console.log(payments)
        setPaymentsStatus(payments);
      }
    };

    /*  if (!clients.length)  */ fetch();

    return () => {};
  }, [, data, payment_date]);



  const hasPaymentsOnDate = (date: Date) => {
    return getPaymentsForDate(date) 
  };

  const getPaymentStatusForDate = (date: Date) => {
    const datePayments = getPaymentsForDate(date);


  

     if(!datePayments) return null

    const hasPaid = datePayments.paid >0
    const hasIncomplete = datePayments.incomplete >0
    const hasOverdue = datePayments.expired >0
    const hasPending = datePayments.pending >0

    //console.log(date, hasPaid, hasIncomplete, hasOverdue, hasPending);
    if (hasOverdue) return "vencida";

    if (hasPending) return "pendiente";

    if (hasIncomplete) return "incompleta";
    if (hasPaid) return "pagada"; 
    return null;
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

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentDate);

  const getPaymentsForDate = (date: Date) => {
    return paymentsStatus.find((p:any)=>{
        return p._id == date.toISOString().split("T")[0]
    })
  };
  const isSameDay = (date1: string | Date, date2: Date) => {
    const d1 =
      typeof date1 == "string"
        ? date1.split("T")[0]
        : date1.toISOString().split("T")[0];
    const d2 = date2.toISOString().split("T")[0];

    return d1 == d2;
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

    const primerDia = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const ultimoDia = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    setPaymentDate({
      from: primerDia.toISOString().split("T")[0],
      to: ultimoDia.toISOString().split("T")[0],
      exact: "",
    });

    console.log(currentDate);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

    const primerDia = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    const ultimoDia = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 2,
      0
    );

    setPaymentDate({
      from: primerDia.toISOString().split("T")[0],
      to: ultimoDia.toISOString().split("T")[0],
      exact: "",
    });

    console.log(currentDate);
  };

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);

    updateFilterValue("payments_date", {
      ...filters.payments_date,
      payment_date: {
        ...filters.payments_date.payment_date,
        exact: date.toISOString().split("T")[0],
      },
    });
    /* return payments.filter((payment) =>
      isSameDay(new Date(payment.payment_date), date)
    ); */
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">
            {monthNames[month]} {year}
          </h3>
          <div className="flex gap-2">
            <button
              title="pepe"
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              title="pepe"
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
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
                onClick={() => onSelectDate(date)}
                className={`aspect-square p-1 rounded-lg transition-all relative text-sm ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : isToday
                    ? "bg-blue-100 text-blue-600"
                    : hasPayments
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <span>{day}</span>
                {hasPayments && !isSelected && (
                  <div
                    className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      paymentStatus === "vencida"
                        ? "bg-red-500"
                        : paymentStatus === "pendiente"
                        ? "bg-blue-500"
                        : paymentStatus === "pagada"
                        ? "bg-green-500"
                        : paymentStatus === "incompleta" ?  "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="flex justify-between gap-2 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">Pagadas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Pendientes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-600">Incompletas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-gray-600">Vencidas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
