import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function MasterLayout() {
  return (
    <>
    <Navbar/>
      <div className="d-flex">
            <div className="sidebar-container">
              <Sidebar/>
            </div>
            <div className="main-contect w-100">
              <Outlet/>
            </div>
      </div>
    </>
  )
}
