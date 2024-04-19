
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'


export default function MasterLayout() {
  return (
    <>
   
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
