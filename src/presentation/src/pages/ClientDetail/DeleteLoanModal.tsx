import React, { useState, useRef, useEffect } from "react";

import Modal from "../../components/Modal";
import { Trash2 } from "lucide-react";

import { request } from "../../services/api/request";
import { useLoanStore } from "../../store/loan.store";
import { toast } from "sonner";
import { useClientStore } from "../../store/client.store";
import { usePaginationFilterStore } from "../../store/PaginationFilter";
import { usePaymentStore } from "../../store/payment.store";

function DeleteLoanModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentLoan, removeLoan } = useLoanStore();
  const {updateClient,selectedClient} = useClientStore()
  const {setPayments} = usePaymentStore()

  const onConfirm = async () => {
    try {

        if(!selectedClient) return 
        if(!currentLoan) return

      const result = await request({
        url: "/loans/" + currentLoan?._id,
        method: "DELETE",
      });

      console.log(result);

      if (!result.success) {
        throw new Error("Error " + result.message);
      }

      removeLoan(String(currentLoan?._id));

      setPayments([])
      
      const statics = selectedClient?.statics;

      
      updateClient(String(selectedClient?._id),{
         statics:{
                    ...statics,
                    loans:{
                        ...statics.loans,
                        
                        total:statics.loans.total-1,
                        active:statics.loans.active-1
                    },
                     payments:{
                        ...statics.payments,
                        total:statics.payments.total+currentLoan.installment_number,
                        pending:statics.payments.pending+currentLoan.installment_number
                    }, 
                    amounts:{
                        ...statics.amounts,
                        client_debt:statics.amounts.client_debt-currentLoan.total_amount,
                        total_lent:statics.amounts.total_lent-currentLoan.amount
                    }
                }
      })

      toast.success("Prestamo eliminado correctamente");

    } catch (error) {
      console.log(error);

      toast.error("ocurrio unn error al intentar eliminar el prestamo");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
              flex items-center gap-3
              w-full px-4 py-2
              hover:bg-red-50
              text-red-600
              transition
            "
      >
        <Trash2 size={16} />
        Eliminar
      </button>

      <Modal open={isOpen}>
        <h2 className="text-xl font-semibold mb-4">
          ¿Estás seguro de eliminar este préstamo?
        </h2>
        <p className="text-gray-700 mb-4">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteLoanModal;
