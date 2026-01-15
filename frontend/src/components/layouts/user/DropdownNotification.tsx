import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router';
/* import ClickOutside from '../ClickOutside.jsx';
import { useSocket } from '../../context/socketContext'; */
/* import apiServices from '../../services/api' */

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
 /*  const {socket,isConnected,} = useSocket() */
 // const {notifications,markNotificationsAsRead,fetchNotifications,setNotifications} = useSocket()	
  
  const notifications:any =[]
  return (
   /*  <ClickOutside onClick={() => setDropdownOpen(false)} className="relative"> */
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifications.length > 0 ? 'inline' : 'hidden'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75">

            </span>
          </span>

          <Bell color='black'></Bell>
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex  w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-stroke sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">
                Notification
              </h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">

                {!notifications.length && (
                    <div className='flex flex-col justify-center items-center p-10'>
                       
                     
                         <Bell className='text-gray-600'></Bell>
                        <span className='text-gray-600 text-md'>No hay notificaciones
</span>                      
                    </div>
                )}
              {notifications && notifications.map((notification:any)=>(
                <Notification key={notification._id} type={notification.type} message={notification.message} />
              ))}
            </ul>
          </div>
        )}
      </li>
  /*   </ClickOutside> */
  );
};


import { CheckCircle, XCircle, Info, AlertTriangle, Bell } from 'lucide-react';

const typeStyles:any = {
  success: {
    icon: <CheckCircle className="text-green-500" />,
    bg: 'bg-green-100',
    border: 'border-green-400',
    text: 'text-green-800',
  },
  error: {
    icon: <XCircle className="text-red-500" />,
    bg: 'bg-red-100',
    border: 'border-red-400',
    text: 'text-red-800',
  },
  info: {
    icon: <Info className="text-blue-500" />,
    bg: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-800',
  },
  warning: {
    icon: <AlertTriangle className="text-yellow-500" />,
    bg: 'bg-yellow-100',
    border: 'border-yellow-400',
    text: 'text-yellow-800',
  },
};
 function Notification({ type = 'info', message="" }) {
  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-sm shadow-md border-l-4 mb-1 ${styles.bg} ${styles.border}`}>
      <div className="mt-1">{styles.icon}</div>
      <div className={`text-sm font-medium ${styles.text}`}>{message}</div>
    </div>
  );
}



export default DropdownNotification;
