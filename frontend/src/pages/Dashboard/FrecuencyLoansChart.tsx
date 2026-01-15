
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';



import React from 'react'
import { useLoanStore } from '../../store/loan.store';

export default function FrecuencyLoansChart() {

    const {loans} = useLoanStore()
     const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
     
       // Datos para gráfico de préstamos por frecuencia
  const loansByFrequency = [
    { name: 'Diaria', value: loans.filter(l => l.payment_interval === 'daily').length },
    { name: 'Semanal', value: loans.filter(l => l.payment_interval === 'weekly' ).length },
    { name: 'Mensual', value: loans.filter(l => l.payment_interval === 'monthly' ).length },
    { name: 'Indefinida', value: loans.filter(l => l.payment_interval === 'custom' ).length },
  ];
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Préstamos por Modalidad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loansByFrequency}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {loansByFrequency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
  )
}
