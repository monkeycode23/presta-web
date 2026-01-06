


import React from 'react'
import { createPortal } from "react-dom";
export default function Modal({children,title,open}:any) {

    if(!open) return null
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-4">{title} </h2>
            {children} 
          </div>
        </div>
  ,document.body)
}
