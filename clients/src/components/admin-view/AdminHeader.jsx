import React from 'react'
import { AlignJustify, LogOut } from "lucide-react";

function AdminHeader({setOpen,open}) {
  const handleLogout = () => {
    // Your logout logic here
  };
  console.log(open);
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-background border-b ">
      <button onClick={() => setOpen(true)} className={`lg:hidden sm:block ${open ? "sm:hidden":""}`}>
      <AlignJustify />
      </button>
      <div className="flex flex-1 justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center bg-black text-white rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          <p className='text-lg'>Logout</p>
        </button>
      </div>
    </header>
  )
}

export default AdminHeader