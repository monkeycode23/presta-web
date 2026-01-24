
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';


import { formatCurrency2 as formatCurrency } from '../../common/funcs';
import React from 'react'
import { usePaymentStore } from '../../store/payment.store';

export default function MonthlyChart() {

    const {payments} = usePaymentStore()

  

     const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
    
    const monthPayments = payments.filter(p => {
      const paymentDate =new Date( p.payment_date) ;
      return paymentDate.getMonth() === date.getMonth() && 
             paymentDate.getFullYear() === date.getFullYear();
    });
    
    monthlyData.push({
      month: monthName,
      recaudado: monthPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      esperado: monthPayments.reduce((sum, p) => sum + p.amount, 0),
    });
  }

  return (
   <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Recaudación Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line type="monotone" dataKey="recaudado" stroke="#10b981" strokeWidth={2} name="Recaudado" />
              <Line type="monotone" dataKey="esperado" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Esperado" />
            </LineChart>
          </ResponsiveContainer>
        </div>

  )
}
