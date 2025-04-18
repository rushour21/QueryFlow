import React from 'react'
import Sidebar from '../component/sidebar.jsx'
import { Outlet } from 'react-router-dom'
import "../styles/dashboard.css"


export default function dashboard() {
  return (
    <div className='dashboardLayout'>
      <Sidebar />
      <div className='dashboardContent'>
      <Outlet />
      </div>
    </div>
  )
}
