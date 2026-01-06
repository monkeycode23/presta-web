import { Calendar, CreditCard, Notebook } from "lucide-react";
import React, { useState, useEffect } from "react";



  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
//components
/* import {
  SackDollar,
  CalendarDateIcon,
  BaselineFactCheck,
  BaselineAssignment,
  OutlinePending,
  PaymentIcon,
  OutlineCheck,
  ExpiredDate,
} from "../../Icons"; */
import { Link } from "react-router";
/* import DropdownDefault from "../../Dropdowns/DropdownDefault";
import PayModal from "../../../pages/Payments/PayModal";
import EditModalPayment from "../../../pages/Loan/EditModalPayment";
import AddNoteModalPayment from "../../../pages/Loan/AddNoteModal";
import PaymentModal from "../../../pages/Loan/PaymentModal";
 */
//import { NoteIcon, Eye, MoneyBillAlt, DeleteIcon } from "../../Icons";
//utils
//import { formatAmount } from "../../../common/funcs";

//redux
//import { useSelector, useDispatch } from "react-redux";
/* import { setLoan, setLeftToPaid } from "../../../redux/reducers/loans";
import {
  setPaidPayments,
  updatePayment,
} from "../../../redux/reducers/payments";

import { setUnbalancePayments } from "../../../redux/reducers/loans";

import { setBruteGains, setNetGains } from "../../../redux/reducers/payments"; */

//hooks
//import { useNotification } from "../../Notifications";

//FUNCS
/* import { payPayment, getNotes } from "../../../pages/Loan/funcs";
import { setNotes,deletePayment } from "../../../redux/reducers/payments";
import { setTotalResults } from "../../../redux/reducers/_pagination";
 */
const PaymentCard = ({ payment }) => {
  const [hasNotes, setHasNotes] = useState(false);
 /*  const loan = useSelector((state) => state.loans.loan);
  const { bruteGains, netGains } = useSelector((state) => state.payments);
  const payments = useSelector((state) => state.payments);
  const leftToPaid = useSelector((state) => state.loans.leftToPaid);
  const dispatch = useDispatch();
  const {showNotification,setNotification} = useNotification() */
  //console.log("payment", payment);

  useEffect(() => {
    const checkNotes = async () => {
      // notes = await getNotes(payment.id, "payment");
      setHasNotes(payment.notes && payment.notes.length > 0);
    };
    checkNotes();
  }, [payment.id]);

  const pay = async (e) => {
   /*  const isCompleted = await payPayment(payment.id, loan);
    //console.log("isCompleted--a>>", isCompleted);

    console.log("left to pa ", leftToPaid, " total amount ", payment.amount);
    dispatch(setLeftToPaid(leftToPaid - payment.amount));

    dispatch(setPaidPayments(payments.paidPayment + 1));

    dispatch(
      updatePayment({
        id: payment.id,
        payment: {
          ...payment,
          status: "paid",
        },
      })
    ); */

   /*  dispatch(setBruteGains(bruteGains + payment.gain));
    dispatch(setNetGains(netGains + payment.amount));
 */
   /*  
    if (isCompleted) {
  dispatch(
        setLoan({
          ...loan,
          status: "completed",
        })
      ); 
    }
    */

    /*  setPayed((prev) => prev + 1)

    setGains((prev) => prev + payment.gains)
    setNetGains((prev) => prev + payment.net_amount)

    setNotification({
      type: "success",
      message: "Pagodo con exito"
    })
    showNotification()


    updatePayments((prev) => {
      return prev.map((p) => p.id == id ? {
        ...p,
        status: "paid"
      } : p)
    }) */
    /* await deletePayment(payment.id)
     await deleteLoan(id) 
     

      
       */
  };
  return (
    <div
      className={`w-full flex  gap-4 xsm:col-span-12
     sm:col-span-12 md:col-span-12 
     lg:col-span-6
     xl:col-span-4w
${
  payment.status === "pending"
    ? "bg-blue-500"
    : payment.status === "paid"
    ? "bg-green-500"
    : payment.status === "incomplete"
    ? "bg-yellow-500"
    : "bg-red-500"
} 
shadow-2xl
    text-white p-4 rounded-xl
    relative
    `}
    >
      <div className="flex flex-row gap-2 justify-center items-center ">
        <CreditCard width={45} height={45} />
      </div>

      {/* Icono de fondo grande en el medio */}
      <div className="absolute top-0 left-20 w-full h-full flex justify-center items-center opacity-20 z-0">
        {payment.status === "pending" ? (
          <OutlinePending width={200} height={200} />
        ) : payment.status === "paid" ? (
          <OutlineCheck width={200} height={200} />
        ) : payment.status === "incomplete" ? (
          <ExpiredDate className="text-white" width={200} height={200} />
        ) : (
          <ExpiredDate className="text-white" width={200} height={200} />
        )} 
      </div>
      <div className="w-full flex flex-col gap-2">
        <Link to={`/loans/${payment.id}`}>
          <p className="text-lg font-bold text-gray-200 z-2">{payment.label}</p>
        </Link>
        {payment.status === "incomplete" ? (
  <div className="pb-1">
    <div className="flex items-end ">
      <h1 className="text-2xl font-semibold line-through text-gray-300">
        ${formatAmount(payment.amount)}
      </h1>
      <h1 className="text-4xl font-bold text-white">
        ${formatAmount(payment.amount - payment.incomplete_amount)}
      </h1>
    </div>
    <span className="inline-block  text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-100 font-medium">
      Abonado: ${formatAmount(payment.incomplete_amount)}
    </span>
  </div>
) : (
  <h1 className="text-4xl font-bold pb-3">
    ${formatAmount(payment.amount)}
  </h1>
)}

{/*         {payment.status === "incomplete" && (
  <div className="text-sm text-white flex flex-col gap-1">
    <p>
      <span className="font-semibold text-green-300">Abonado:</span>{" "}
      ${formatAmount(payment.incomplete_amount)}
    </p>
    <p>
      <span className="font-semibold text-red-300">Restante:</span>{" "}
      ${formatAmount(payment.amount - payment.incomplete_amount)}
    </p>
  </div>
)}
      */}   <div className="flex flex-row gap-2 justify-between">
          <div className=" flex flex-row gap-2 items-center">
            <Calendar width={20} height={20} />
            <p className="text-sm">{payment.payment_date}</p>
          </div>
          <div className="flex items-center gap-2">
            {hasNotes && (
              <div
                className={`rounded-full p-1 flex items-center justify-center ${
                  payment.status === "incomplete"
                    ? "bg-yellow-600"
                    : "bg-yellow-400"
                }`}
              >
                <Notebook className="text-white" width={16} height={16} />
              </div>
            )}
            <span className="text-sm flex flex-row gap-2 items-center">
              {payment.status === "pending" ? (
                <span className="text-md font-bold bg-sky-800 text-white rounded-md p-1 z-1">
                  pendiente
                </span>
              ) : payment.status === "paid" ? (
                <span className="text-md font-bold bg-green-700 text-white rounded-md p-1 z-1">
                  pagada
                </span>
              ) : payment.status === "incomplete" ? (
                <span className="text-md font-bold bg-yellow-700 text-white rounded-md p-1 z-1">
                  incompleto
                </span>
              ) : (
                <span className="text-md font-bold bg-red-700 text-white rounded-md p-1 z-1">
                  vencida
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <span className="absolute top-2 right-4 hover:cursor-pointer">
       
      </span>
    </div>
  );
};

export default PaymentCard;



/* 

 <DropdownDefault right={true}>
          {/* agregar nota button 
          <AddNoteModalPayment
            payment={payment}
            button={
              <button
                onClick={async () => {}}
                className="flex w-full items-center gap-2 text-black rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
              >
                <NoteIcon payment={payment} />
                agregar nota
              </button>
            }
          ></AddNoteModalPayment>

          {/*  ver pago button  
          <PaymentModal
            payment={payment}
            button={
              <button className="flex w-full items-center gap-2 text-black rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                <Eye></Eye>
                ver pago
              </button>
            }
          ></PaymentModal>

          {/* pay button 
          <button
            disabled={payment.status === "paid"}
            onClick={pay}
            className={`flex w-full items-center gap-2 ${
              payment.status === "paid" ? "opacity-30 cursor-not-allowed" : ""
            } text-black rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4`}
          >
            <MoneyBillAlt></MoneyBillAlt>
            Pagar
          </button>

          <button
            disabled={payment.status === "paid"}
            onClick={async () => {
              //const interest = payment.amount * 0.3;
              try {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");

                const note = `Monto abonado (recargo): $${formatAmount(
                  payment.gain
                )} resta por pagar $${formatAmount(
                  payment.amount - payment.gain
                )}`;

                await window.database.models.Payments.updatePayment({
                  id: payment.id,
                  status: "incomplete",
                  incomplete_amount: payment.gain,
                  paid_date: `${year}-${month}-${day}`,
                  notes: note,
                });

                dispatch(
                  updatePayment({
                    id: payment.id,
                    payment: {
                      ...payment,
                      status: "incomplete",
                      incomplete_amount: payment.gain,
                      notes: note,
                    },
                  })
                );

                dispatch(setBruteGains(bruteGains + payment.gain));
              dispatch(setNetGains(netGains + payment.gain));
              dispatch(setLeftToPaid(leftToPaid-payment.gain))

              } catch (error) {
                console.log(error);
              }

           
            }}
            className={`flex w-full items-center gap-2 ${
              payment.status === "paid" ? "opacity-30 cursor-not-allowed" : ""
            } text-black rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4`}
          >
            <MoneyBillAlt />
            Pagar Recargo
          </button>

          {/* editar pago 
          <EditModalPayment
            payment={payment}
            button={
              <button className="flex w-full items-center gap-2 text-black rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                <svg
                  className="fill-current"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_62_9787)">
                    <path
                      d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_62_9787">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Editar pago
              </button>
            }
          ></EditModalPayment>

          <button
            onClick={async () => {

              try{


                const a =await window.database.models.Payments.deletePayment(payment.id);
                

                
                console.log(a)

                await window.database.models.Loans.updateLoan({
                  id: loan.id,
                  installment_number: loan.installment_number> 0 ?  loan.installment_number  - 1 : 0,
                });
  
                
                
                dispatch(deletePayment(payment.id));
                dispatch(
                  setLoan({
                    ...loan,
                    installment_number: loan.installment_number> 0 ?  loan.installment_number  - 1 : 0,
                  })
                );

                dispatch(setUnbalancePayments(setTotalResults))     

                setNotification({
                  type:"success",
                  message:"Pago eliminado con exito"
                });
                showNotification();

              }catch(error){
                setNotification({
                  type:"danger",
                  message:"Algo salio mal "+error
                });
                showNotification();
              }
              
              
            }}
            className="flex w-full items-center gap-2 text-black rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          >
            <DeleteIcon></DeleteIcon>
            Borrar pago
          </button>
        </DropdownDefault>
*/


 export function BaselineAssignment(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="currentColor"
          d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 0c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m2 14H7v-2h7zm3-4H7v-2h10zm0-4H7V7h10z"
        ></path>
      </svg>
    )
  }
  

  export function BaselineFactCheck(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M10 17H5v-2h5zm0-4H5v-2h5zm0-4H5V7h5zm4.82 6L12 12.16l1.41-1.41l1.41 1.42L17.99 9l1.42 1.42z"
        ></path>
      </svg>
    )
  }

  
  export function OutlinePending(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"
        ></path>
        <circle cx="7" cy="12" r="1.5" fill="currentColor"></circle>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
        <circle cx="17" cy="12" r="1.5" fill="currentColor"></circle>
      </svg>
    )
  }
  
    export function OutlineCheck(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="currentColor"
          d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
        ></path>
      </svg>
    )
  }

  
export const ExpiredDate = (props) => (
  <svg
    version="1.0"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="100px"
    height="100px"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 100 100"
    xmlSpace="preserve"
    {...props}
  >
    <rect x="23.333" y="43.333" width="13.333" height="6.667"></rect>
    <rect x="43.333" y="43.333" width="13.333" height="6.667"></rect>
    <rect x="63.333" y="43.333" width="13.334" height="6.667"></rect>
    <rect x="63.333" y="56.667" width="13.334" height="6.666"></rect>
    <rect x="63.333" y="70" width="13.334" height="6.667"></rect>
    <rect x="50" y="56.667" width="6.667" height="6.666"></rect>
    <rect x="50" y="70" width="6.667" height="6.667"></rect>
    <path
      d="M83.333,16.667h-6.666V10H70v6.667H30V10h-6.667v6.667h-6.667C13,16.667,10,19.668,10,23.333v60C10,86.999,13,90,16.667,90
	h66.667C86.999,90,90,86.999,90,83.333v-60C90,19.668,86.999,16.667,83.333,16.667z M83.333,23.333V30H16.667v-6.667H83.333z
	 M16.667,83.333V36.667h66.667v46.667H16.667z"
    ></path>
    <polygon
      points="38.618,56.667 33.333,61.953 28.048,56.667 23.333,61.38 28.62,66.667 23.333,71.953 28.047,76.667 33.333,71.38 
	38.62,76.667 43.333,71.953 38.047,66.667 43.333,61.38"
    ></polygon>
  </svg>
);
