import React, { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { Employee, ChatMessage } from '../App';

interface EmployeeChatProps {
  employees: Employee[];
  messages: ChatMessage[];
  onSendMessage: (employeeId: string, message: string) => void;
}

export function EmployeeChat({ employees, messages, onSendMessage }: EmployeeChatProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0]?.id || '');
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedEmployeeId) {
      onSendMessage(selectedEmployeeId, messageText);
      setMessageText('');
    }
  };

  const sortedMessages = [...messages].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const getEmployeeName = (employeeId: string) => {
    return employees.find(e => e.id === employeeId)?.name || 'Desconocido';
  };

  const getEmployeeInitials = (employeeId: string) => {
    const name = getEmployeeName(employeeId);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Chat Grupal de Empleados</h2>
        <p className="text-gray-600">Comunícate con tu equipo en tiempo real</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
        <div className="flex h-full">
          {/* Sidebar de empleados */}
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-gray-900">Equipo ({employees.filter(e => e.status === 'activo').length})</h3>
            </div>
            <div className="overflow-y-auto" style={{ height: 'calc(100% - 65px)' }}>
              {employees.filter(e => e.status === 'activo').map(employee => (
                <button
                  key={employee.id}
                  onClick={() => setSelectedEmployeeId(employee.id)}
                  className={`w-full p-4 text-left hover:bg-white transition-colors border-b border-gray-200 ${
                    selectedEmployeeId === employee.id ? 'bg-white border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      {getEmployeeInitials(employee.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate">{employee.name}</p>
                      <p className="text-sm text-gray-500 truncate">{employee.position}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Área de chat */}
          <div className="flex-1 flex flex-col">
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {sortedMessages.map((message) => {
                const isCurrentUser = message.employeeId === selectedEmployeeId;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                      {getEmployeeInitials(message.employeeId)}
                    </div>
                    <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-md`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-600">{getEmployeeName(message.employeeId)}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(message.timestamp).toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isCurrentUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
