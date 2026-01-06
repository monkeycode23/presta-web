import React, { Children, useCallback, useEffect, useRef, useState } from "react";
import clsx from 'clsx'
import { Outlet } from "react-router";
import Sidebar from "./user/Sidebar";
/* import AppHeader from "./AppHeader"; */
/* import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import PrivateRoute from "../components/PrivateRoute"; */
import { useAppSettingsStore } from "../../store/app.settings.store";
import Header from "./user/Header";

const UserDefaultLayout = ({children}:any) => {
  const { isSidebarExpanded, isSidebarHovered, isSidebarMobileOpen,theme } = useAppSettingsStore();
  const sidebarWidth = isSidebarExpanded ? 266 : 90; // w-64 = 16*16=256px, w-20=80px

  /* 
  ${
          
  */


  return (
   
    <div className={"min-h-screen flex "}>
     <Sidebar></Sidebar>
      <div
        className={clsx(
            `transition-all duration-300 ease-in-out  w-full p-2 `,
         isSidebarExpanded  ? "ml-[290px]" : "ml-[90px]",
         isSidebarMobileOpen ? "ml-10" : "",
        
        )}

         /* style={{
          marginLeft: isSidebarMobileOpen ? 0 : sidebarWidth, // si sidebar en mobile, margen 0
        }} */
      >
        <Header></Header>

         {children}
   
      </div>
    </div>
  );
};

export default UserDefaultLayout;
