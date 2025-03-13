import React from 'react'
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/auth-slice.js';

function AdminHeader({setOpen,open}) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
      <button onClick={() => setOpen(true)} className={`lg:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors ${open ? "sm:hidden":""}`}>
        <AlignJustify className="text-gray-700" />
      </button>
      <div className="flex flex-1 justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default AdminHeader