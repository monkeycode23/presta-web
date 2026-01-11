import React, { useState } from 'react';
import { Plus, Mail, Phone, Briefcase, Calendar, UserCheck, UserX, Eye, Edit2, Activity, Shield, ChevronLeft, CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import type{ Employee, ActivityLog } from '../../types/general';

interface EmployeeManagementProps {
  employees: Employee[];
  activityLogs?: ActivityLog[];
  onAddEmployee: (employee: Omit<Employee, 'id' | 'hiredDate' | 'status'>) => void;
  onUpdateEmployee?: (employeeId: string, updates: Partial<Employee>) => void;
}

export function EmployeeManagement({ employees =[], activityLogs = [],  }: EmployeeManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const activeEmployees = employees.filter(e => e.status === 'activo').length;
  const inactiveEmployees = employees.filter(e => e.status === 'inactivo').length;


  const onAddEmployee = (formData: FormData) => {


  } 
  
  const onUpdateEmployee = (formData: FormData) => { }

  const handleAddEmployee = (formData: FormData) => {
    const newEmployee = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string,
      accessPin: formData.get('accessPin') as string,
      permissions: {
        canCreateClients: formData.get('canCreateClients') === 'on',
        canCreateLoans: formData.get('canCreateLoans') === 'on',
        canRegisterPayments: formData.get('canRegisterPayments') === 'on',
      },
    };
    onAddEmployee(newEmployee);
    setIsModalOpen(false);
  };

  const handleEditEmployee = (formData: FormData) => {
    if (!editingEmployee || !onUpdateEmployee) return;

    const updates = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string,
      accessPin: formData.get('accessPin') as string,
      status: formData.get('status') as 'activo' | 'inactivo',
      permissions: {
        canCreateClients: formData.get('canCreateClients') === 'on',
        canCreateLoans: formData.get('canCreateLoans') === 'on',
        canRegisterPayments: formData.get('canRegisterPayments') === 'on',
      },
    };

    onUpdateEmployee(editingEmployee.id, updates);
    setIsEditModalOpen(false);
    setEditingEmployee(null);
  };

  if (selectedEmployee) {
    return (
      <EmployeeDetail
        employee={selectedEmployee}
        activityLogs={activityLogs.filter(log => log.employeeId === selectedEmployee.id)}
        onBack={() => setSelectedEmployee(null)}
        onEdit={() => {
          setEditingEmployee(selectedEmployee);
          setIsEditModalOpen(true);
          setSelectedEmployee(null);
        }}
      />
    );
  }

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
          Agregar Empleado
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
              <p className="text-gray-900 mt-1">{activeEmployees}</p>
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
              <p className="text-gray-900 mt-1">{inactiveEmployees}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <UserX className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Empleados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => {
          const employeeActivities = activityLogs.filter(log => log.employeeId === employee.id);
          return (
            <div key={employee.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    {employee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  employee.status === 'activo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Desde {new Date(employee.hiredDate).toLocaleDateString('es-ES')}
                </div>
              </div>

              {/* Permisos */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Permisos</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    {employee.permissions?.canCreateClients ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <XCircle className="w-3 h-3 text-red-600" />
                    )}
                    <span className={employee.permissions?.canCreateClients ? 'text-green-700' : 'text-gray-500'}>
                      Crear clientes
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {employee.permissions?.canCreateLoans ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <XCircle className="w-3 h-3 text-red-600" />
                    )}
                    <span className={employee.permissions?.canCreateLoans ? 'text-green-700' : 'text-gray-500'}>
                      Otorgar préstamos
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {employee.permissions?.canRegisterPayments ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <XCircle className="w-3 h-3 text-red-600" />
                    )}
                    <span className={employee.permissions?.canRegisterPayments ? 'text-green-700' : 'text-gray-500'}>
                      Registrar pagos
                    </span>
                  </div>
                </div>
              </div>

              {/* Estadísticas de actividad */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-900">Actividad</span>
                </div>
                <span className="text-sm text-blue-600">{employeeActivities.length} acciones</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedEmployee(employee)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalle
                </button>
                <button
                  onClick={() => {
                    setEditingEmployee(employee);
                    setIsEditModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Agregar */}
      {isModalOpen && (
        <EmployeeModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEmployee}
        />
      )}

      {/* Modal Editar */}
      {isEditModalOpen && editingEmployee && (
        <EmployeeModal
          employee={editingEmployee}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEmployee(null);
          }}
          onSubmit={handleEditEmployee}
        />
      )}
    </div>
  );
}

// Componente de Modal para agregar/editar empleado
function EmployeeModal({
  employee,
  onClose,
  onSubmit,
}: {
  employee?: Employee;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">
            {employee ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nombre Completo *</label>
              <input
                type="text"
                name="name"
                defaultValue={employee?.name}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                defaultValue={employee?.email}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Teléfono *</label>
              <input
                type="tel"
                name="phone"
                defaultValue={employee?.phone}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Cargo *</label>
              <input
                type="text"
                name="position"
                defaultValue={employee?.position}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">PIN de Acceso (4 dígitos) *</label>
              <input
                type="text"
                name="accessPin"
                defaultValue={employee?.accessPin}
                maxLength={4}
                pattern="[0-9]{4}"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {employee && (
              <div>
                <label className="block text-sm text-gray-700 mb-1">Estado *</label>
                <select
                  name="status"
                  defaultValue={employee.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            )}
          </div>

          {/* Permisos */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <h4 className="text-gray-900">Permisos del Empleado</h4>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="canCreateClients"
                  defaultChecked={employee?.permissions?.canCreateClients ?? true}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <p className="text-sm text-gray-900">Crear Clientes</p>
                  <p className="text-xs text-gray-500">Permite agregar nuevos clientes al sistema</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="canCreateLoans"
                  defaultChecked={employee?.permissions?.canCreateLoans ?? true}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <p className="text-sm text-gray-900">Otorgar Préstamos</p>
                  <p className="text-xs text-gray-500">Permite crear y asignar préstamos a clientes</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="canRegisterPayments"
                  defaultChecked={employee?.permissions?.canRegisterPayments ?? true}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <p className="text-sm text-gray-900">Registrar Pagos</p>
                  <p className="text-xs text-gray-500">Permite marcar pagos como realizados</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {employee ? 'Guardar Cambios' : 'Agregar Empleado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente de detalle de empleado
function EmployeeDetail({
  employee,
  activityLogs,
  onBack,
  onEdit,
}: {
  employee: Employee;
  activityLogs: ActivityLog[];
  onBack: () => void;
  onEdit: () => void;
}) {
  const createdClients = activityLogs.filter(log => log.action === 'created_client').length;
  const createdLoans = activityLogs.filter(log => log.action === 'created_loan').length;
  const registeredPayments = activityLogs.filter(log => log.action === 'registered_payment').length;
  const totalAmount = activityLogs
    .filter(log => log.action === 'created_loan')
    .reduce((sum, log) => sum + (log.metadata?.amount || 0), 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created_client':
        return <UserCheck className="w-4 h-4" />;
      case 'created_loan':
        return <Briefcase className="w-4 h-4" />;
      case 'registered_payment':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created_client':
        return 'bg-purple-100 text-purple-800';
      case 'created_loan':
        return 'bg-green-100 text-green-800';
      case 'registered_payment':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-gray-900 mb-1">Detalle del Empleado</h2>
          <p className="text-gray-600">Información y actividad de {employee.name}</p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit2 className="w-5 h-5" />
          Editar Empleado
        </button>
      </div>

      {/* Información del empleado */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              {employee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <h3 className="mb-1">{employee.name}</h3>
              <p className="text-blue-100 mb-2">{employee.position}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {employee.phone}
                </div>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            employee.status === 'activo'
              ? 'bg-green-500/20 text-green-100'
              : 'bg-gray-500/20 text-gray-100'
          }`}>
            {employee.status}
          </span>
        </div>
      </div>

      {/* Estadísticas de actividad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Clientes Creados</p>
          <p className="text-gray-900 mt-1">{createdClients}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Préstamos Otorgados</p>
          <p className="text-gray-900 mt-1">{createdLoans}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Pagos Registrados</p>
          <p className="text-gray-900 mt-1">{registeredPayments}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Monto Total Prestado</p>
          <p className="text-gray-900 mt-1">{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      {/* Permisos */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Permisos Asignados</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border-2 ${
            employee.permissions?.canCreateClients
              ? 'border-green-200 bg-green-50'
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              {employee.permissions?.canCreateClients ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className={`text-sm ${
                  employee.permissions?.canCreateClients ? 'text-green-900' : 'text-gray-500'
                }`}>
                  Crear Clientes
                </p>
                <p className="text-xs text-gray-500">Agregar nuevos clientes</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            employee.permissions?.canCreateLoans
              ? 'border-green-200 bg-green-50'
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              {employee.permissions?.canCreateLoans ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className={`text-sm ${
                  employee.permissions?.canCreateLoans ? 'text-green-900' : 'text-gray-500'
                }`}>
                  Otorgar Préstamos
                </p>
                <p className="text-xs text-gray-500">Crear préstamos</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            employee.permissions?.canRegisterPayments
              ? 'border-green-200 bg-green-50'
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              {employee.permissions?.canRegisterPayments ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className={`text-sm ${
                  employee.permissions?.canRegisterPayments ? 'text-green-900' : 'text-gray-500'
                }`}>
                  Registrar Pagos
                </p>
                <p className="text-xs text-gray-500">Marcar pagos realizados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registro de actividad */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Registro de Actividad ({activityLogs.length})</h3>
        </div>

        {activityLogs.length > 0 ? (
          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg ${getActionColor(log.action)}`}>
                  {getActionIcon(log.action)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{log.description}</p>
                  {log.metadata?.clientName && (
                    <p className="text-xs text-gray-600 mt-1">
                      Cliente: {log.metadata.clientName}
                      {log.metadata.amount && ` • ${formatCurrency(log.metadata.amount)}`}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(log.timestamp).toLocaleString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No hay actividad registrada aún</p>
          </div>
        )}
      </div>
    </div>
  );
}
