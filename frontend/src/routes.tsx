import { createBrowserRouter } from "react-router";

import {Dashboard} from "./pages/Dashboard";
import UserDefaultLayout from "./components/layouts/UserDefaultLayout";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { ClientList } from "./pages/Clients";
import { PaymentsCalendar } from "./pages/Payments";
import { EmployeeManagement } from "./pages/Employee";
import { ClientDetail } from "./pages/ClientDetail";

const router = createBrowserRouter([
    {
        path:"/auth",
        children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
    },
  {
    path: "/",
    element:<PrivateRoute/> ,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/clients/:clientId",
        element:<ClientDetail></ClientDetail>,

      },
      {
        path: "/clients",
        element: <ClientList />,
      },
      
      {
        path: "/payments",
        element: <PaymentsCalendar />,
      },
      {
        path: "/employees",
        element: <EmployeeManagement />,
      },
    ],
  },
]);

export default router;