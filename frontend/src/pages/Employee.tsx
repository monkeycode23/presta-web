import React, { useState } from 'react';
import { Plus, Mail, Phone, Briefcase, Calendar, UserCheck, UserX, Eye, Edit2, Activity } from 'lucide-react';
import {type Employee,type ActivityLog,initialEmployees } from '../types/general.d';

interface EmployeeManagementProps {
  employees: Employee[];
  activityLogs?: ActivityLog[];
  onAddEmployee: (employee: Omit<Employee, 'id' | 'hiredDate' | 'status'>) => void;
  onUpdateEmployee?: (employeeId: string, updates: Partial<Employee>) => void;
}

export function EmployeeManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
  });
  /* { employees, activityLogs, onAddEmployee, onUpdateEmployee }: EmployeeManagementProps */
 const [employees, setEmployees] = useState(initialEmployees);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEmployee(formData);
    setFormData({ name: '', email: '', phone: '', position: '' });
    setIsModalOpen(false);
  };

  const onAddEmployee=(a:any) => {
    
  }
  const activeEmployees = employees.filter(e => e.status === 'activo');
  const inactiveEmployees = employees.filter(e => e.status === 'inactivo');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-2">Gestión de Empleados</h2>
          <p className="text-gray-600">Administra tu equipo de trabajo</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Empleado
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Empleados</p>
              <p className="text-gray-900 mt-1">{employees.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Activos</p>
              <p className="text-gray-900 mt-1">{activeEmployees.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inactivos</p>
              <p className="text-gray-900 mt-1">{inactiveEmployees.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de empleados */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Empleados Activos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeEmployees.map(employee => (
            <div key={employee.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-gray-900">{employee.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Briefcase className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Activo
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Desde {new Date(employee.hiredDate).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Nuevo Empleado</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="juan@empresa.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+58 414-1234567"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Cargo *</label>
                <select
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un cargo</option>
                  <option value="Gerente de Cobranza">Gerente de Cobranza</option>
                  <option value="Analista de Crédito">Analista de Crédito</option>
                  <option value="Asesor de Clientes">Asesor de Clientes</option>
                  <option value="Contador">Contador</option>
                  <option value="Asistente Administrativo">Asistente Administrativo</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear Empleado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}