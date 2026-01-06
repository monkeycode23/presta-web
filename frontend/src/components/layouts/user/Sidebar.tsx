import React,{useState} from 'react'
import { LayoutDashboard, School, Calendar, Bell, Settings, Menu, X,FilterX,FileText, Users, DollarSign, ChartBar, User2, User2Icon, WorkflowIcon, UserCheck2 } from 'lucide-react';
import { Link } from 'react-router';
import { useAppSettingsStore } from '../../../store/app.settings.store';
export default function Sidebar() {

      const { isSidebarExpanded, isSidebarHovered, isSidebarMobileOpen,toggleSidebar} = useAppSettingsStore();

      const [sidebarOpen, setSidebarOpen] = useState(true);
       const [currentView, setCurrentView] = useState("dashboard");
   
    const selectedClassroom = "";
  
  
    return (
    

      <aside className={`${isSidebarExpanded? 'w-64' : 'w-20'}  min-h-screen fixed z-50  bg-white border-r
       border-gray-200 transition-all duration-300 flex flex-col dark:bg-black`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          {isSidebarExpanded && <h1 className="text-blue-600">EduManage</h1>}
          <button
            onClick={() => toggleSidebar()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
          onClick={()=>{setCurrentView("dashboard")}}
            to={"/"}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'dashboard' && !selectedClassroom
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            {isSidebarExpanded && <span>Dashboard</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("clients")}}
           to={"/clients"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'clients' && !selectedClassroom
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            {isSidebarExpanded && <span>Clientes</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("payments")}}
            to={"/payments"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'payments'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            {isSidebarExpanded && <span>Pagos</span>}
          </Link>

           <Link
          onClick={()=>{setCurrentView("employees")}}
            to={"/employees"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'employees'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserCheck2 className="w-5 h-5" />
            {isSidebarExpanded && <span>Empleados</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("notifications")}}
            to={"/notifications"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'notifications'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            {isSidebarExpanded && <span>Notificaciones</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("statics")}}
            to={"/statics"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'statics'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChartBar className="w-5 h-5" />
            {isSidebarExpanded && <span>Reportes</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5" />
            {isSidebarExpanded && <span>Configuración</span>}
          </button>
        </div>
      </aside>
  )
}
