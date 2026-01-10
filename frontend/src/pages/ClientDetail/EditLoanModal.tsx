
import React, { useState, useRef, useEffect } from "react";


import Modal from "../../components/Modal";

 function DeleteModal() {
    const [isOpen,setIsOpen] = useState(false);

    const onConfirm=()=>{

        alert()
    }


  return (
    <>
     <button

          onClick={()=>setIsOpen(true)}
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

             <h2 className="text-xl font-semibold mb-4">¿Estás seguro de eliminar este préstamo?</h2>
        <p className="text-gray-700 mb-4">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={()=>setIsOpen(false)}
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
  )
}
