import React from 'react'
import ShoppingHeader from './ShoppingHeader'
import { Outlet } from 'react-router-dom'
import ShoppingFooter from './ShoppingFooter'

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden min-w-full min-h-screen">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <ShoppingFooter />
      {/* common footer */}
    </div>
  )
}

export default ShoppingLayout