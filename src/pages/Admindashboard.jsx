import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const Admindashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className=" bg-gray-900 text-white">
        <AdminSidebar />
      </div>

      {/* Scrollable Outlet */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Admindashboard