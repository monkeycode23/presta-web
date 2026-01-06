import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Client } from "../../types/general.d";
import Modal from "../Modal";
import { useForm } from "../../hooks/useForm";
import { CreateClientSchema } from "../../errors/schemas/client.schema";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: Omit<Client, "id" | "createdAt">) => void;
}

export function AddClientModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);



  const {values,errors,loading,setValue,handleSubmit} = useForm({
    name:"ADD_CLIENT",
    schema:CreateClientSchema,
    initialValues:{
    name: "",
    phone: "",
    email: "",
    address: "",
  }

  })
  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();



    handleSubmit({
        url:"/clients",
        method:"POST",
    },(data:any)=>{

        console.log(data)
    })
    // onAdd(formData);
   // setFormData({ name: "", phone: "", email: "", address: "" });
    //onClose();
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Nuevo Cliente
      </button>
      <Modal open={isModalOpen}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Nuevo Cliente</h3>
          <button
            title="button"
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={_handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              
              value={values.name}
              onChange={(e) =>
                setValue("name",e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Juan Pérez"
            />
             {
                errors.name && (
                    <ErrorMessage message={errors.name} />
                )
            }
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Teléfono 
            </label>
            <input
              type="tel"
            
              value={values.phone}
              onChange={(e) =>
                setValue("phone",e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+58 414-1234567"
            />
             {
                errors.phone && (
                    <ErrorMessage message={errors.phone} />
                )
            }
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email </label>
            <input
              type="email"
              
              value={values.email}
              onChange={(e) =>
                setValue("email",e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="juan@email.com"
            />
             {
                errors.email && (
                    <ErrorMessage message={errors.email} />
                )
            }
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Dirección 
            </label>
            <textarea
              
              value={values.address}
              onChange={(e) =>
                setValue("address",e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Av. Principal #123"
              rows={2}
            />
            {
                errors.address && (
                    <ErrorMessage message={errors.address} />
                )
            }
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear Cliente
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}



export default function ErrorMessage({message}:{message:string}) {
  return (
    <div className="text-red-500 p-2 text-sm">{message}</div>
  )
}
