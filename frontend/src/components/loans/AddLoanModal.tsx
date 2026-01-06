import React, { useState } from 'react';
import { X } from 'lucide-react';
import type{ Loan, PaymentFrequency } from '../../types/general';

interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (loan: Omit<Loan, 'id' | 'clientId'>) => void;
}

export function AddLoanModal({ isOpen, onClose, onAdd }: AddLoanModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    interestRate: '',
    frequency: 'semanal' as PaymentFrequency,
    installments: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0;
    const interest = parseFloat(formData.interestRate) || 0;
    return amount + (amount * interest / 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = calculateTotal();
    
    onAdd({
      amount: parseFloat(formData.amount),
      interestRate: parseFloat(formData.interestRate),
      totalAmount,
      frequency: formData.frequency,
      installments: parseInt(formData.installments),
      startDate: new Date(formData.startDate),
      status: 'activo',
    });
    
    setFormData({
      amount: '',
      interestRate: '',
      frequency: 'semanal',
      installments: '',
      startDate: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  if (!isOpen) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Nuevo Préstamo</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Monto del préstamo *</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5000.00"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Tasa de interés (%) *</label>
            <input
              type="number"
              required
              min="0"
              step="0.1"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Modalidad de pago *</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as PaymentFrequency })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="diaria">Diaria</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="indefinida">Indefinida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Número de cuotas *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.installments}
              onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Fecha de inicio *</label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {formData.amount && formData.interestRate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Monto del préstamo:</span>
                <span className="text-gray-900">{formatCurrency(parseFloat(formData.amount))}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Intereses ({formData.interestRate}%):</span>
                <span className="text-gray-900">
                  {formatCurrency((parseFloat(formData.amount) * parseFloat(formData.interestRate)) / 100)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-gray-900">Total a pagar:</span>
                <span className="text-green-600">{formatCurrency(calculateTotal())}</span>
              </div>
              {formData.installments && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Cuota {formData.frequency}:</span>
                  <span className="text-gray-900">
                    {formatCurrency(calculateTotal() / parseInt(formData.installments))}
                  </span>
                </div>
              )}
            </div>
          )}

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
              Crear Préstamo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
