


import React, { useState } from 'react'
import {type ActivityLog, } from '../../types/general.d';
import { Activity } from 'lucide-react';

export default function EmployeeActivity() {

         const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([{
             id: "1",
  employeeId: "1",
  employeeName: "pepe pecas",
  action:"created_client",
    
  description: "description asdlaksldasd...",
  timestamp: new Date(),
 
         }]);


  return (
   <>
   {activityLogs && activityLogs.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">Actividad Reciente del Equipo</h3>
          </div>
          <div className="space-y-3">
            {activityLogs.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm flex-shrink-0">
                  {log.employeeName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{log.employeeName}</span> {log.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(log.timestamp).toLocaleString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                  log.action === 'created_loan' ? 'bg-green-100 text-green-800' :
                  log.action === 'registered_payment' ? 'bg-blue-100 text-blue-800' :
                  log.action === 'created_client' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {log.action === 'created_loan' && 'Préstamo'}
                  {log.action === 'registered_payment' && 'Pago'}
                  {log.action === 'created_client' && 'Cliente'}
                  {log.action === 'updated_client' && 'Actualización'}
                  {log.action === 'updated_loan' && 'Actualización'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
   </>
  )
}
